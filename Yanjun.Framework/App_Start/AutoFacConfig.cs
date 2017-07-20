﻿using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac.Integration.Mvc;
using System.Reflection;
using System.Web.Mvc;
using log4net.Config;
using Yanjun.Framework.Mvc.Controllers;
using log4net;
using Yanjun.Framework.Data.DBContext;
using Autofac.Integration.WebApi;
using System.Web.Http;

namespace Yanjun.Framework.Mvc.App_Start
{
    public class AutoFacConfig
    {
        public static void Register()
        {
            var builder = new ContainerBuilder();

            var config = GlobalConfiguration.Configuration;

            RegisterLog(builder);

            RegisterDb(builder);

            RegisterData(builder);

            RegisterMvc(builder);

            RegisterApi(builder,config);

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }


        static void RegisterLog(ContainerBuilder builder)
        {
            XmlConfigurator.Configure();

            builder.Register<ILog>(x => LogManager.GetLogger(typeof(HomeController)));
        }

        static void RegisterDb(ContainerBuilder builder)
        {
            builder.RegisterType<MyDbContext>().AsSelf().InstancePerRequest();
        }

        static void RegisterData(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(MyDbContext)));
        }




        static void RegisterMvc(ContainerBuilder builder)
        {

            // Register your MVC controllers. (MvcApplication is the name of
            // the class in Global.asax.)
            builder.RegisterControllers(Assembly.GetExecutingAssembly());

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

        static void RegisterApi(ContainerBuilder builder,HttpConfiguration config)
        {
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(config);
        }


    }
}