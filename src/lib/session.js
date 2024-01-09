export async function checkuser() {
    const session = await Astro.locals.auth.validate();
    console.log('checking session - ' + session);
    return session;
}