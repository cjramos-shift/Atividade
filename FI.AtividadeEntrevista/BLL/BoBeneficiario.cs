using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
            return benef.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
            benef.Alterar(beneficiario);
        }

        /// <summary>
        /// Consulta o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long idCliente)
        {
            DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
            return benef.Consultar(idCliente);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
            benef.Excluir(id);
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Listar(long id)
        {
            DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
            return benef.Listar(id);
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
            return benef.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// Lista os beneficiarios por ID
        /// </summary>
        //public List<DML.Beneficiario> PesquisaId(int id)
        //{
        //    DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
        //    return benef.PesquisaId(id);
        //}

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DAL.Beneficiarios.DaoBeneficiario benef = new DAL.Beneficiarios.DaoBeneficiario();
            return benef.VerificarExistencia(CPF);
        }
    }
}
