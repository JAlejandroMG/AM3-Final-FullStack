import supertest from "supertest";
import app from "../index";
import { Genres } from "../models/";

describe("Probando peticiones de Generos", ( ) => {

    afterAll(async (done) => {
       await Genres.destroy({where: { name: "Action"}});
       done()
    });
    
    //*=====================Test singup New Genre
    it("Agregando un nuevo genero", async ( done ) => {
       //arrange
       let genreObj = {
          name: "Action"
       };
 
       //assert
       const response = await supertest(app).post("/api/v1/genres/2").send(genreObj);
 
       //act
       expect(response.status).toBe(201);
       expect(response.body).toHaveProperty("message", "Registro exitoso");
 
       done();
    });

    //*=====================Test getting Genres
    it("Obteniendo todos los generos", async ( done ) => {
        //arrange

        //assert
        const response = await supertest(app).get("/api/v1/genres/3");

        //act
        expect(response.status).toBe(200);

        done();

    });

    //*=====================Test getting Genre by ID
    it("Obteniendo un genero por su id", async ( done ) => {
        //arrange
        const id = 1;

        //assert
        const response = await supertest(app).get(`/api/v1/genres/${id}/1`);

        //act
        expect(response.status).toBe(200);

        done();
    });

    //*=====================Test editing Genre by ID
    it("Modificar un genero por su id", async ( done ) => {
        //arrange
        const genreObj = {
        name: "Action"
        };

        //assert
        const response = await supertest(app).put(`/api/v1/genres/15/2`).send(genreObj);

        //act
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "El registro del genero ha sido modificado");

        done();
    });

    //*=====================Test deleting Genre by ID
    it("Eliminar un genero por su id", async ( done ) => {
        //arrange

        //assert
        const response = await supertest(app).delete(`/api/v1/genres/15/1`);

        //act
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Se ha eliminado el registro");

        done();
    });

    //*=====================Test getting all content of an Genre by ID
    it("Obtener todo el contenido de un genero por su id", async ( done ) => {
        //arrange
        const id = 1;

        //assert
        const response = await supertest(app).get(`/api/v1/genres/${id}/contents/3`);

        //act
        expect(response.status).toBe(200);

        done();
    });

});