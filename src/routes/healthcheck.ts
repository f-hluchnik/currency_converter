import Router from "koa-router";
const router = new Router();

router.get(`/ping`, async (ctx) => {
    try {
        ctx.body = {
            status: "success",
        };
    } catch (err) {
        console.error(err);
    }
});

export default router;