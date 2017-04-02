using Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class InterestController : ApiController
    {
        private InterestService service;
        public InterestController()
        {
            service = new InterestService();
        }
        public IHttpActionResult PostInterest(WebInterest model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            return Ok(service.add(model));
        }

        [Route("api/Interest/Top/{id}")]
        public IHttpActionResult Get(int id)
        {
            return Ok(service.getTopInterest(id));
        }
        [Route("api/Interest/ForAccount/{id}")]
        public IHttpActionResult GetInterests(int id)
        {
            var c = service.getByAccountId(id);
            if (c == null)
                return BadRequest();
            return Ok(c);
        }
        public IHttpActionResult Get()
        {
            return Ok(service.getAll());
        }

        [Route("api/Interest/ForEvent/{id}")]
        public IHttpActionResult GetInterestsEvent(int id)
        {
            var c = service.getByEventId(id);
            if (c == null)
                return BadRequest();
            return Ok(c);
        }
        [Route("api/Interest/Add/{interestId}/{accountId}")]
        public IHttpActionResult Post(int interestId, int accountId)
        {
            var c = service.add(interestId, accountId);
            if (c == -1)
                return BadRequest();
            return Ok();
        }
        [Route("api/Interest/Remove/{interestId}/{accountId}")]
        public IHttpActionResult Delete(int interestId, int accountId)
        {
            var c = service.remove(interestId, accountId);
            if (c == -1)
                return BadRequest();
            return Ok();
        }

       
    }
}