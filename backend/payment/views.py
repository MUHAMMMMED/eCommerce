from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse 
from django.http import JsonResponse
from rest_framework.request import Request
from django.utils.encoding import smart_str
from django.conf import settings
from orders.models import Order,OrderItem, Customers,DictionaryProductName
from cart.models import Cart,CartItem
import random
import datetime
import json
import stripe
import logging
  
  
DOMAIN =settings.DOMAIN
 
# Set the Stripe API key
stripe.api_key = settings.STRIPE_SECRET_KEY

# Configure logging
logger = logging.getLogger(__name__)

 
@api_view(['POST'])
def create_checkout_session(request: Request):
    try:
        data = request.data  # This will parse the request body as JSON
        items = data.get('items')

        if not items:
            return JsonResponse({'error': 'Items list is missing'}, status=400)

        line_items = []
        for item in items:
            order_id = item.get('id')
            final_total = item.get('finalTotal')
            session_id = request.session.session_key or request.session.save()

            handle_Cart_To_OrderItem(final_total,order_id, session_id) 

            if not order_id or not final_total:
                return JsonResponse({'error': 'Order ID or final total is missing in one of the items'}, status=400)

            # Convert final_total to the smallest currency unit (cents)
            final_total_cents = int(float(final_total) * 100)

            line_items.append({
                'price_data': {
                    'currency': 'SAR',
                    'product_data': {
                        'name': 'اجمالي المدفوعات',
                    },
                    'unit_amount': final_total_cents,
                },
                'quantity': 1,
            })

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=f'{DOMAIN}/success/{order_id}',
            cancel_url=f'{DOMAIN}/cancel',
            metadata={
                "session_id": session_id,
                "order_id": order_id,
            }
        )

        return JsonResponse({'url': checkout_session.url})

    except json.JSONDecodeError as e:
        logger.error(f'Invalid JSON: {str(e)}')
        return JsonResponse({'error': f'Invalid JSON: {str(e)}'}, status=400)
    except stripe.error.StripeError as e:
        logger.error(f'Stripe error: {str(e)}')
        return JsonResponse({'error': f'Stripe error: {str(e)}'}, status=403)
    except Exception as e:
        logger.error(f'Unexpected error: {str(e)}')
        return JsonResponse({'error': str(e)}, status=403)

 
def handle_Cart_To_OrderItem(final_total, order_id, session_id):
    try:
        
            # Get the order and update the total
            order = Order.objects.get(id=order_id)
            order.total = final_total
            order.save()

            # Get the cart and calculate tax
            cart = Cart.objects.get(session_id=session_id)
            cart_total = cart.total
            order_tax = order.tax
            taxAmount = (cart_total * order_tax) / 100
            order.tax_amount = taxAmount
            order.save()

            # Transfer cart items to order items
            cart_items = CartItem.objects.filter(cart=cart)

            for item in cart_items:
                name = item.product.name
                quantity = item.quantity
                price = get_price_based_on_quantity(item.product, quantity)

                dictionary, _ = DictionaryProductName.objects.get_or_create(name=name)
                orderItem, _ = OrderItem.objects.get_or_create(
                    order=order,
                    dictionary=dictionary,
                    quantity=quantity,
                    price=price,
                    cost=item.product.cost
                )

                for note in item.notes.all():  # Assuming notes is a ManyToMany field
                    orderItem.notes.add(note)
                orderItem.save()

    except Order.DoesNotExist:
        logger.error(f'Order with id {order_id} does not exist.')
    except Cart.DoesNotExist:
        logger.error(f'Cart with session_id {session_id} does not exist.')
    except Exception as e:
        logger.error(f'An error occurred: {e}')
        raise

 

def get_price_based_on_quantity(product, quantity):
    if quantity <= product.quantity1:
        return product.price1
    elif quantity <= product.quantity2:
        return product.price2
    elif quantity <= product.quantity3:
        return product.price3
    elif quantity <= product.quantity4:
        return product.price4
    elif quantity <= product.quantity5:
        return product.price5
    else:
        return product.price5
 
def generate_invoice_number():
    while True:
        random_number = random.randint(1000, 9999)
        current_date = datetime.datetime.now()
        formatted_date = current_date.strftime('%Y%m%d')
        invoice_number = f"{formatted_date}{random_number}"
        # Check if the invoice number already exists in Order objects
        if not Order.objects.filter(Tracking=invoice_number).exists():
            return invoice_number

  
def generate_tracking_number():
    while True:
        random_number = random.randint(1000, 9999)
        current_date = datetime.datetime.now()
        formatted_date = current_date.strftime('%Y%m%d')
        tracking_number = f"{formatted_date}{random_number}"
        # Check if the tracking number already exists in Order objects
        if not Order.objects.filter(Tracking=tracking_number).exists():
            return tracking_number
 

@api_view(['POST'])
@csrf_exempt
def stripe_webhook(request):
 
    payload = smart_str(request.body)
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE", "")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        logger.error("Invalid payload")
        return JsonResponse({'error': "Invalid payload"}, status=400)
    except stripe.error.SignatureVerificationError:
        logger.error("Invalid signature")
        return JsonResponse({"error": "Invalid signature"}, status=400)

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        session_id = session["metadata"]["session_id"]
        order_id = session["metadata"]["order_id"]
        email = session.get('customer_details', {}).get('email')

        try:
            invoice_number = generate_invoice_number()  # Generate unique invoice number
            tracking_number = generate_tracking_number()  # Generate unique tracking number
            order = Order.objects.get(id=order_id)
            order.paid = True
            order.session_key = ''
            order.invoice_number = invoice_number
            order.Tracking = tracking_number
            order.save()

            customer = Customers.objects.get(id=order.customer.id)
            customer.email = email
            customer.save()

        except Order.DoesNotExist:
            logger.error(f"Order with id {order_id} does not exist.")
            return JsonResponse({"error": f"Order with id {order_id} does not exist."}, status=404)

        try:
            items = OrderItem.objects.filter(order_id=order_id)
            for item in items:
                item.paid = True
                item.save()
        except OrderItem.DoesNotExist:
            logger.error(f"No items found for order id {order_id}.")
            return JsonResponse({"error": f"No items found for order id {order_id}."}, status=404)

        try:
            cart = Cart.objects.get(session_id=session_id)
            cart.delete()
        except Cart.DoesNotExist:
            logger.error(f"Cart with session id {session_id} does not exist.")
            return JsonResponse({"error": f"Cart with session id {session_id} does not exist."}, status=404)

    return JsonResponse({"status": "success"})
 