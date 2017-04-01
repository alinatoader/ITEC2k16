using Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class EventController:ApiController
    {
        private EventService service;

        public EventController()
        {
            service = new EventService();
        }

        public IHttpActionResult Post(WebEvent model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var ok = service.save(model);
            if (ok == null)
                return BadRequest("This event already exists..");
            return Ok(ok);
        }

        public IHttpActionResult Delete(int id)
        {
            var ok = service.remove(id);
            if (ok == null)
                return NotFound();
            return Ok(ok);
        }

        public IHttpActionResult Put(WebEvent model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var ok = service.update(model);
            if (ok == null)
                return NotFound();
            return Ok(ok);
        }
     
        public IHttpActionResult Get()
        {
            return Ok(service.getAll());
        }

        [Route("api/Event/Attendants/{id}")]
        public IHttpActionResult Get(int id)
        {
            var ok = service.getAllAttenders(id);
            if (ok == null)
                return BadRequest();
            else if (ok.Count == 0)
                return Ok(0);
            return Ok(ok);
        }

        [Route("api/Event/Add/{eventId}/{interestId}")]
        public IHttpActionResult Post( int eventId, int interestId)
        {
            var c = service.addInterest(eventId,interestId);
            if (c == -1)
                return BadRequest();
            return Ok(c);
        }

    }
}