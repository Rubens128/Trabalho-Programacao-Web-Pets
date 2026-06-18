import { db } from "../config/firebase.js";

async function AdicionarUsuarioService(usuarioDict) {

  try {

    const usuario = {

      uid: usuarioDict.uid,
      nome: usuarioDict.nome,
      email: usuarioDict.email,
      tipo: "usuario",
      criadoEm: new Date(),
      fotoPerfilUrl: "",
      endereco: {
        cidade: "",
        cep: "",
        estado: "",
        rua: "",
        complemento: "",
        numero: "",
        referencia: "",
        bairro: ""
      },
      petsAdicionados: 0,
      petsAdotados: 0
    }

    await db.collection("usuarios").doc(usuarioDict.uid).set(usuario);

    return usuario;

  } catch (error) {

    console.log("Erro ao adicionar usuário:", error);

    throw new Error("Erro ao adicionar usuário", error);
  }
}

async function ListarUsuariosService(filtros) {
  try {
    if (filtros.userId === null) {


      const usuariosSnapshot = await db.collection("usuarios")
        .orderBy("nome")
        .startAt(filtros.pesquisa)
        .endAt(filtros.pesquisa + "\uf8ff")
        .limit(filtros.limit)
        .get();

      const usuariosLista = usuariosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return usuariosLista;

    } else {

      console.log("Buscando usuário com ID:", filtros.userId);

      const usuarioSnapshot = await db.collection("usuarios").doc(filtros.userId).get();
      
      if(usuarioSnapshot.data() === undefined) {
        
        throw new Error("Usuário não encontrado");
      }

      const usuario = { ...usuarioSnapshot.data(), id: usuarioSnapshot.id };

      console.log("Usuario encontrado:", usuario);

      return usuario;
    }

  } catch (error) {

    console.error("Erro ao listar usuários:", error);
    throw new Error("Erro ao listar usuários");

  }
}


async function DeletarUsuarioService(userId) {

    try {
        await db.collection("usuarios").doc(userId).delete();

        return { sucesso: true };

    } catch (error) {

        console.log("Erro ao deletar usuário:", error);

        throw new Error("Erro ao deletar usuário", error);
    }
}

async function EditarUsuariosService(userId, novosDados) {

    try {
        
      await db.collection("usuarios").doc(userId).update({...novosDados});

        return { sucesso: true };

    } catch (error) {
        
      console.log("Erro ao editar usuário:", error);

      throw new Error("Erro ao editar usuário", error);
    }
}

export async function teste(req, res) {

  try {

    const petsAtualizados = pets.map((pet) => {
      return {
        ...pet,
        especie: pet.especie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        porte: pet.porte.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        status: pet.status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }
    });

    const resultados = await Promise.all(petsAtualizados.map(async (pet) => {
      return db.collection("pets").add(pet);
    }));

    console.log(`${resultados.length} pets adicionados!`);

    resultados.forEach((docRef) => {
      console.log(docRef.id);
    });

    return res.status(200).json({ message: `${resultados.length} pets adicionados!` });

  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erro ao adicionar pets." });
  }
}

export { AdicionarUsuarioService, ListarUsuariosService, DeletarUsuarioService, EditarUsuariosService };