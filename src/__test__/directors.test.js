import supertest from "supertest";
import app from "../index";
import { Directors } from "../models";

describe("Probando peticiones de Directores", ( ) => {

    afterAll(async (done) => {
       await Directors.destroy({where: { name: "Pablito Ruiz"}});
       done()
    });
    
    //*=====================Test singup New Director
    it("Agregando un nuevo director", async ( done ) => {
       //arrange
       let directorObj = {
          name: "Pablito Ruiz"
       };
 
       //assert
       const response = await supertest(app).post("/api/v1/directors/2").send(directorObj);
 
       //act
       expect(response.status).toBe(201);
       expect(response.body).toHaveProperty("message", "Registro exitoso");
 
       done();
    });

    //*=====================Test getting Directors
   it("Obteniendo todos los directores", async ( done ) => {
    //arrange

    //assert
    const response = await supertest(app).get("/api/v1/directors/3");

    //act
    expect(response.status).toBe(200);

    done();
 });

 //*=====================Test getting Director by ID
 it("Obteniendo un director por su id", async ( done ) => {
    //arrange
    const id = 1;

    //assert
    const response = await supertest(app).get(`/api/v1/directors/${id}/1`);

    //act
    expect(response.status).toBe(200);

    done();
 });

 //*=====================Test editing Director by ID
 it("Modificar un director por su id", async ( done ) => {
    //arrange
    const directorObj = {
       name: "Mario Reyna"
    };

    //assert
    const response = await supertest(app).put(`/api/v1/directors/769/2`).send(directorObj);

    //act
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "El registro del director ha sido modificado");

    done();
 });

 //*=====================Test deleting Director by ID
 it("Eliminar un director por su id", async ( done ) => {
    //arrange

    //assert
    const response = await supertest(app).delete(`/api/v1/directors/769/1`);

    //act
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Se ha eliminado el registro");

    done();
 });

 //*=====================Test getting all content of an Director by ID
 it("Obtener todo el contenido de un director por su id", async ( done ) => {
    //arrange
    const id = 1;

    //assert
    const response = await supertest(app).get(`/api/v1/directors/${id}/contents/3`);

    //act
    expect(response.status).toBe(200);

    done();
 });
 


});