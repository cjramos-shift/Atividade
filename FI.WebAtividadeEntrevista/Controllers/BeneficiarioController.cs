using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (!bo.VerificarExistencia(model.CPF))
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        Nome = model.Nome,
                        CPF = model.CPF,
                        IdCliente = model.IdCliente
                    });

                    return Json("Cadastro efetuado com sucesso");
                }
                else
                    return Json("CPF já utilizado");
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (!bo.VerificarExistencia(model.CPF))
                {
                    bo.Alterar(new Beneficiario()
                    {
                        Id = model.Id,
                        Nome = model.Nome,
                        CPF = model.CPF,
                        IdCliente = model.IdCliente
                    });

                    return Json("Cadastro alterado com sucesso");
                }
                else
                    return Json("CPF já utilizado");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            List<Beneficiario> beneficiarios = bo.Listar(id);
            List<BeneficiarioModel> model = new List<BeneficiarioModel>();

            try
            {
                if (beneficiarios != null && beneficiarios.Any())
                {
                    foreach (var beneficiario in beneficiarios)
                    {
                        model.Add(new BeneficiarioModel
                        {
                            Id = beneficiario.Id,
                            Nome = beneficiario.Nome,
                            CPF = beneficiario.CPF,
                            IdCliente = beneficiario.IdCliente
                        });
                    }
                }

            }
            catch (Exception ex) { }
            return View(model);
        }

        public JsonResult BeneficiarioList(long id)
        {
            try
            {
                BoBeneficiario bo = new BoBeneficiario();
                List<Beneficiario> beneficiarios = bo.Listar(id);

                return Json(new { Result = "OK", Records = beneficiarios });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        // Ação para excluir um registro existente
        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (id <= 0)
            {
                return Json(new { Result = "ERROR", Message = "ID inválido." });
            }

            // Aqui você pode chamar um método para excluir o beneficiário
            bo.Excluir(id);

            return Json(new { Result = "OK" });
        }

        // POST: Beneficiario/Excluir/5
        [HttpPost]
        public JsonResult Excluir(BeneficiarioModel model)
        {
            return Json("");
        }
    }
}
