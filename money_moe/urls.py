from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import JavaScriptCatalog
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path, re_path
from users import views as users_views

from django.views.generic import TemplateView

app_name = "money_moe"
urlpatterns = [
    # api
    path("api/", include("api.urls"), name="api"),

    # admin
    path("g0atch33se&pizz1/", admin.site.urls, name="admin"),

    # React
    path("", TemplateView.as_view(template_name='index.html')),

    # match all other pages (React)
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]



'''
urlpatterns = [
    path("", include("accounts.urls"), name="home"),
    path("", include("users.urls"), name="users"),
    path("", include("wallets.urls"), name="wallets"),
    path("api/", include("api.urls"), name="api"),
    path("captcha/", include('captcha.urls')),

    # password reset
    path("password-reset/",
        auth_views.PasswordResetView.as_view(template_name="users/password_reset.html"),
        name="password_reset"),
    path("password-reset-done/", 
        auth_views.PasswordResetDoneView.as_view(template_name="users/password_reset_done.html"),
        name="password_reset_done"),
    path("password-reset-confirm/<uidb64>/<token>/", 
        auth_views.PasswordResetConfirmView.as_view(template_name="users/password_reset_confirm.html"),
        name="password_reset_confirm"),
    path("password-reset-complete/", 
        auth_views.PasswordResetCompleteView.as_view(template_name="users/password_reset_complete.html"),
        name="password_reset_complete"),
]

urlpatterns += i18n_patterns(path("i18n/", include("django.conf.urls.i18n")))
urlpatterns += i18n_patterns(path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'))

if "rosetta" in settings.INSTALLED_APPS:
    urlpatterns += [re_path(r"^rosetta/", include("rosetta.urls"))]
'''
