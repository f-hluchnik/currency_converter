import Router from "koa-router";
import {getAll} from "../../db/currencies";

const currenciesRouter = new Router();

currenciesRouter.get(`/`, async (ctx) => {
    try {
        ctx.body = await getAll();
    } catch (err) {
        console.error(err);
    }
})

export default currenciesRouter;