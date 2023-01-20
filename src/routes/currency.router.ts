import Router from "koa-router";
import {getAll, getByName, insertNew, updateCurrency, removeByName} from "../../db/currencies";

const currenciesRouter = new Router();

currenciesRouter.get(`/`, async (ctx) => {
    try {
        ctx.body = await getAll();
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.get(`/:currency`, async (ctx) => {
    try {
        ctx.body = await getByName("USD");
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.post(`/`, async (ctx) => {
    try {
        ctx.body = await insertNew({currency: "USD", rate: 2});
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.put(`/`, async (ctx) => {
    try {
        ctx.body = await updateCurrency("USD", 3);
    } catch (err) {
        console.error(err);
    }
})

currenciesRouter.delete(`/`, async (ctx) => {
    try {
        ctx.body = await removeByName("USD");
    } catch (err) {
        console.error(err);
    }
})

export default currenciesRouter;