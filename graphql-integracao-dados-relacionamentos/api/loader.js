module.exports = (cfg) => {
    require("./user")(cfg)
    require("./turma")(cfg)
    require("./matricula")(cfg)
}