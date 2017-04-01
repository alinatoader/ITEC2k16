using Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class AccountController:ApiController
    {
        private AccountService service;
        public AccountController()
        {
            service = new AccountService();
        }

        public IHttpActionResult Post(WebAccount model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var ok=service.save(model);
            if (ok == null)
                return BadRequest("This username is already used..");
            return Ok(ok);
        }

      
        public IHttpActionResult Put(WebAccount model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var ok = service.update(model);
            if (ok == null)
                return BadRequest();
            return Ok(ok);
        }

        [Route("api/Account/Join/{aId}/{eId}")]
        public IHttpActionResult Post(int aId,int eId)
        {
            var c = service.joinEvent(aId, eId);
            if (c == -1)
                return BadRequest();
            if (c == -2)
                return BadRequest("Can't join event that has already started..");
            if (c == -3)
                return BadRequest("You already joined an event at this time..");
            return Ok();
        }
        [Route("api/Account/Unjoin/{aId}/{eId}")]
        public IHttpActionResult Delete(int aId, int eId)
        {
            var c = service.unjoinEvent(aId, eId);
            if (c == -1)
                return BadRequest();
            return Ok();
        }

        [Route("api/Account/Events/{id}")]
        public IHttpActionResult Get(int id)
        {
            var c = service.getEvents(id);
            if (c == null)
                return BadRequest();
            return Ok(c);
        }
    }
}