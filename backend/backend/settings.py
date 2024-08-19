from pathlib import Path
from datetime import timedelta
import os
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
 
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config(
    "SECRET_KEY",
    cast=str,
    default="l#c66qv(=&0ktjbiuguigptw+zi%kf2xv&&x%&8da&j^m7#-kq+cw5a**"
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', cast=bool, default=False)
 

# Hosts allowed to access this Django application
ALLOWED_HOSTS = ['*']  # Note: Change this in production to a more restrictive list

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Libraries
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',
    'django_cleanup.apps.CleanupConfig',
    # Apps
    'accounts',
    'products',
    'cart',
    'orders',
    'payment',
    'home',
    'accounting',
    'Report',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
  
CORS_ALLOW_ALL_ORIGINS=True
CORS_ALLOW_CREDENTIALS=True
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000" ]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
] 
WSGI_APPLICATION = 'backend.wsgi.application'

AUTH_USER_MODEL = 'accounts.UserAccount'

DOMAIN="http://localhost:3000"

 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': '5432',
    }
}
 
# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=170),  # Access token lifetime
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),     # Refresh token lifetime
    'AUTH_HEADER_TYPES': ('Bearer',),                # Token type used in Authorization header
}

REST_FRAMEWORK = {
    'NON_FIELD_ERRORS_KEY':'error',
        'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Using database-backed sessions
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_AGE = 1209600  # Two weeks
SESSION_SAVE_EVERY_REQUEST = True  # Save the session to the database on every request
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_SAMESITE = None
SESSION_COOKIE_SECURE = False  # Set to True in production
 
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Cairo'
USE_I18N = True
USE_TZ = True
 
# Static files (CSS, JavaScript, Images)
 
STATIC_URL = '/static/'
STATIC_ROOT = '/app/static'  
MEDIA_URL = '/media/'
MEDIA_ROOT = '/app/media'   


# Stripe settings
STRIPE_SECRET_KEY = os.getenv('STRIPE_API_KEY')
STRIPE_WEBHOOK_SECRET =os.getenv('STRIPE_WEBHOOK_SECRET')  

# Other settings... 
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


  