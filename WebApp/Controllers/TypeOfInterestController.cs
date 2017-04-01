using Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class TypeOfInterestController:ApiController
    {
        private TypeOfInterestService service;

        public TypeOfInterestController()
        {
            service = new TypeOfInterestService();
        }

        public IHttpActionResult Get()
        {
            return Ok(service.getTypesOfInterest());
        }
    }
}