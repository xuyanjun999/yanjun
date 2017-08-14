using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac.Integration.Mvc;
using System.Reflection;
using System.Web.Mvc;
using log4net.Config;
using log4net;
using Yanjun.Framework.Data.DBContext;
using Yanjun.Framework.Service.Sys;
using Yanjun.Framework.Data.Repository;
using System.IO;
using LiftNext.Controllers;

namespace LiftNext.App_Start
{
    public class AutoFacConfig
    {
        public static void Register()
        {
            var builder = new ContainerBuilder();


            RegisterLog(builder);

            RegisterDb(builder);

            RegisterData(builder);

            RegisterService(builder);

            RegisterMvc(builder);

            //RegisterApi(builder, config);

            var container = builder.Build();
         

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            //config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }


        static void RegisterLog(ContainerBuilder builder)
        {
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config", "log4net.config");

            XmlConfigurator.Configure(new FileInfo(filePath));

            builder.Register<ILog>(x => LogManager.GetLogger(typeof(HomeController)));

            //builder.Register(x => new CadBusiness()).PropertiesAutowired();
        }

        static void RegisterDb(ContainerBuilder builder)
        {
            builder.Register(x => new MyDbContext()).PropertiesAutowired().InstancePerRequest();
            builder.Register(x => new RepositoryBase()).AsImplementedInterfaces().PropertiesAutowired().InstancePerRequest();

        }

        static void RegisterData(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(RepositoryBase))).Except<RepositoryBase>().AsImplementedInterfaces().AsSelf().PropertiesAutowired();

        }

        static void RegisterService(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(MenuService))).AsImplementedInterfaces().AsSelf().PropertiesAutowired();
        }


        static void RegisterMvc(ContainerBuilder builder)
        {

            // Register your MVC controllers. (MvcApplication is the name of
            // the class in Global.asax.)
            builder.RegisterControllers(Assembly.GetExecutingAssembly()).PropertiesAutowired();

            // OPTIONAL: Register model binders that require DI.
            //builder.RegisterModelBinders(typeof(MvcApplication).Assembly);

            //builder.RegisterModelBinderProvider();

            //// OPTIONAL: Register web abstractions like HttpContextBase.
            //builder.RegisterModule<AutofacWebTypesModule>();

            //// OPTIONAL: Enable property injection in view pages.
            //builder.RegisterSource(new ViewRegistrationSource());

            // OPTIONAL: Enable property injection into action filters.
            builder.RegisterFilterProvider();

            // OPTIONAL: Enable action method parameter injection (RARE).
            //builder.InjectActionInvoker();

            // Set the dependency resolver to be Autofac.

        }

        //static void RegisterApi(ContainerBuilder builder, HttpConfiguration config)
        //{
        //   // builder.RegisterApiControllers(Assembly.GetExecutingAssembly()).PropertiesAutowired();



        //    // OPTIONAL: Register the Autofac filter provider.
        //  //  builder.RegisterWebApiFilterProvider(config);

        //}


    }
}