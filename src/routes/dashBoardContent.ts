import { Router } from "express";
import { ParsedQs } from 'qs'
import { createSession,updateSession } from "../controllers/sessions";

const router = Router();

router.post("/create-session", async (req, res) => {
    try {
      const body = req.body
      //const objReady = JSON.parse(body);
      const data = await createSession(body)
      console.log(data, "data")
      res.json({
        success: true,
        message: "campaign create done",
        data: data
      });
    } catch (error) {
      res.status(400);
      res.json({
        success: false,
        message: error.message,
      });
    }
});

router.put("/updateSession", async (req, res) => {
    try {
      const body = req.body;
     console.log(body, "update Start")
     const data = await updateSession(body)
      res.json({
        success: true,
        message: "campaign update done",
        
      });
    } catch (error) {
      res.status(400);
      res.json({
        success: false,
        message: error.message,
      });
    }
});

router.post("/media", async (req, res) => {
    try {
      interface MyQuery extends ParsedQs {
        info: string;
      }
      const query = req.query as MyQuery;
      const objReady = JSON.parse(query.info);
      //const data = await createSession(objReady)
      res.json({
        success: true,
        message: "campaign create done",
        
      });
    } catch (error) {
      res.status(400);
      res.json({
        success: false,
        message: error.message,
      });
    }
});

  export default router