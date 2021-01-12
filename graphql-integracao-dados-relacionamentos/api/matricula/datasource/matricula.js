const { SQLDataSource } = require("datasource-sql");
const DataLoader = require("dataloader");

class MatriculasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);

    this.Resposta = {
      mensagem: "",
    };
  }
  matriculasPorEstudanteLoader = new DataLoader(
    this.getMatriculasPorEstudante.bind(this)
  );

  async matricularEstudante(ids) {
    const novaMatricula = {
      estudante_id: ids.estudante,
      turma_id: ids.turma,
      status: "confirmado",
    };

    this.incluiMatricula(novaMatricula);
    this.Resposta.mensagem = "matriculas confirmada";
    return this.Resposta;
  }

  async getMatriculasPorTurma(id) {
    const matriculas = await this.db
      .select("*")
      .from("matriculas")
      .where({
        turma_id: Number(id),
      });
    return matriculas;
  }

  async getMatriculasPorEstudante(ids) {
    const matriculas = await this.db
      .select("*")
      .from("matriculas")
      .whereIn("estudante_id", ids)
      .select();
    return ids.map((id) => matriculas.filter((m) => m.estudante_id === id));
  }

  async getMatriculas() {
    return this.db.select("*").from("matriculas");
  }

  async getMatricula(id) {
    const turma = await this.db
      .select("*")
      .from("matriculas")
      .where({ id: Number(id) });
    return turma[0];
  }

  async incluiMatricula(novaMatricula) {
    const novaMatriculaId = await this.db
      .insert(novaMatricula)
      .returning("id")
      .into("matriculas");

    const turmaInserida = await this.getMatricula(novaMatriculaId[0]);
    return { ...turmaInserida };
  }
  async atualizaMatricula(novosDados) {
    await this.db
      .update({ ...novosDados.turma })
      .where({ id: Number(novosDados.id) })
      .into("matriculas");

    const turmaAtualizada = await this.getMatricula(novosDados.id);
    return {
      ...turmaAtualizada,
    };
  }
  async deletaMatricula(id) {
    await this.db("matriculas").where({ id: id }).del();

    this.Resposta.mensagem = "registro deletado";
    return this.Resposta;
  }

  async cancelarMatricula(idMatricula) {
    await this.db
      .update({ status: "cancelado" })
      .where({ id: Number(idMatricula) })
      .into("matriculas");

    this.Resposta.mensagem = "matrícula cancelada";
    return this.Resposta;
  }
}
module.exports = MatriculasAPI;
