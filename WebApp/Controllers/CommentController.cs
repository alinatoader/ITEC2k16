using Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class CommentController:ApiController
    {
        private CommentService service;
        public CommentController()
        {
            service = new CommentService();
        }

        public IHttpActionResult Post(WebComment model)
        {
            if(!ModelState.IsValid)
                return BadRequest();
            var c = service.save(model);
            if (model == null )
                return BadRequest();
            return Ok(c);
        }
        public IHttpActionResult Put(WebComment model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var c = service.update(model);
            if (model == null)
                return BadRequest();
            return Ok(c);
        }
        public IHttpActionResult Delete(int id)
        {
            var c = service.remove(id);
            if (c == null)
                return NotFound();
            return Ok(c);
        }
        public IHttpActionResult Get(int id)
        {
            var c = service.getAllByEventId(id);
            if (c == null)
                return BadRequest();
            if (c.Count == 0)
                return NotFound();
            return Ok(c);
        }
    }
}