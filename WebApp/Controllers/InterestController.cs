using Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class InterestController : ApiController
    {
        private InterestService service;
        public InterestController()
        {
            service = new InterestService();
        }
        [Route("api/Interest/Top/{id}")]
        public IHttpActionResult Get(int id)
        {
            return Ok(service.getTopInterest(id));
        }
        [Route("api/Interest/ForAccount/{id}")]
        public IHttpActionResult GetInterests(int id)
        {
            return Ok(service.getByAccountId(id));
        }
        public IHttpActionResult Get()
        {
            return Ok(service.getAll());
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