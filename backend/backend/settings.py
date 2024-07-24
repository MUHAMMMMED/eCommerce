from pathlib import Path
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-z(83xn=7-#(hjl6vgy+)*cd%y^k*3_f3ak1l9wp-t&6jovm@r6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*', 'http://localhost:3000']

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

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
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
 
STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
STATICFILES_DIRS = [BASE_DIR / 'static']
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Stripe settings
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', 'sk_test_51M0Bs9A9gttpg3uSGA5xQhMRCLgEaywkUYXphiJv5oT9MbDOTvNocMgzpfWu9fpvBira9Jiv4sKpIyGPX4XSq5tL00VCMwZq91')
STRIPE_WEBHOOK_SECRET = 'whsec_583c87d69ea6c87e5c56ec19dac24ae51887a3cb70f75b67226e24921192aa9f'
 
# Send Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'mohamedeg7000@gmail.com'  # Replace with your email address
EMAIL_HOST_PASSWORD = 'nseg ozas tebl zvzt'  # Replace with your email password
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_PORT = 587  # Replace with the correct SMTP port


 

  