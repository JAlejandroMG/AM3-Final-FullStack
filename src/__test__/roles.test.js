import supertest from "supertest";
import app from "../index";
import { Roles } from "../models";


describe("Probando el registro de roles", ( ) => {

    afterAll(async (done) => {
        await Roles.destroy({where: { name: "Ventas"}});
        done()
    });
    
    //*=====================Test create New Roles
    it("Agregando un nuevo rol", async ( done ) => {
      //arrange
      let rolObj = {
          name: "Ventas"
      };

      //assert
      const response = await supertest(app).post("/api/v1/roles").send(rolObj);

      //act
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Registro exitoso!");

      done();
  });
  
  //*=====================Test edit Roles
  it("Modificando un rol", async ( done ) => {
    //arrange
    const roleId = 5;
    let rolObj = {
        name: "Recursos Humanos"
    };

    //assert
    const response = await supertest(app).put(`/api/v1/roles/${roleId}`).send(rolObj);

    //act
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Se ha hecho la modificación solicitada");

    done();
});

});