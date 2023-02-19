from rest_framework.permissions import AllowAny
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from first_r_app.views import AuthorModelViewset, TODOModelViewset, ProjectModelViewset, UserModelViewset
from first_r_app.views import MyUserViewSet, MyProjectView, MyTODOViewSet
from rest_framework.authtoken import views
from graphene_django.views import GraphQLView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

...
schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

router = DefaultRouter()
router.register('authors', AuthorModelViewset)
router.register('todo', TODOModelViewset)
router.register('users', UserModelViewset)
router.register('projects', ProjectModelViewset)
# router.register('project', MyProjectView, basename='my_p')
#router.register('t/todo', MyTODOViewSet, basename='my_t')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('users/', MyUserViewSet.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),

    path('graphql/', GraphQLView.as_view(graphiql=True)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
