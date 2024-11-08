require('dotenv').config();
const {Bot, GrammyError, HttpError, Keyboard, InlineKeyboard} = require('grammy');

const {hydrate} = require('@grammyjs/hydrate');

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());


bot.api.setMyCommands([
    {
        command: 'start', 
        description: 'Запуск БОТА'
    },

    {
        command: 'menu', 
        description: 'get menu'
    },
    // {
    //     command: 'share', 
    //     description: 'Share data'
    // },
    // {
    //     command: 'inlinekeyboard', 
    //     description: 'inline-keyboard'
    // },
])


const menuKeyboard = new InlineKeyboard().text('Get the order status', 'order-status').text('contact support', 'support');
const backKeyboard = new InlineKeyboard().text('Back');

bot.command('menu', async (ctx) =>{
    await ctx.reply('choose the place to pick up your dish', {
        reply_markup: menuKeyboard,
    })
})


bot.callbackQuery('order-status', async (ctx) => {
    await ctx.callbackQuery.message.editText('Order status: on the way', {
        reply_markup: backKeyboard,
    })
    await ctx.answerCallbackQuery();
})
bot.callbackQuery('support', async (ctx) => {
    await ctx.callbackQuery.message.editText('Write your question', {
        reply_markup: backKeyboard,
    })
    await ctx.answerCallbackQuery();
})

bot.callbackQuery('Back', async (ctx) => {
    await ctx.callbackQuery.message.editText('choose the place to pick up your dish', {
        reply_markup: menuKeyboard,
    })
    await ctx.answerCallbackQuery();
})


bot.command('start', async (ctx) =>{ //context

ctx.react('😇')
await ctx.reply('Привет я *жирный* _курсив_ API BOT\\!',{
    reply_parameters: {message_id: ctx.msg.message_id},
    parse_mode: 'HTML',
    disable_web_page_preview: true
});
});

// bot.command('inlinekeyboard', async (ctx) => {
//     // const inlineK = new InlineKeyboard()
//     // .text('label', 'data for us').row()
//     // .text('label1', 'data for us2').row()
//     // .text('label2', 'data for us3');

//     const inlineKeyboard2 = new InlineKeyboard().url('Go to the telegram channel', 'https://lolzteam.readme.io/reference/postsget')

//     await ctx.reply('Чем хочешь поделиться?', {
//         reply_markup: inlineKeyboard2
//     } )
// })

// bot.callbackQuery(/data for us[2-3]/, async (ctx) => {
//     await ctx.answerCallbackQuery("Your data has choosen");
//     await ctx.reply(`You has choose type of ${ctx.callbackQuery.data} data`);
// })

// bot.on('callback_query:data', async (ctx)=> {
//     await ctx.answerCallbackQuery("Your data has choosen");
//     await ctx.reply(`You has choose type of ${ctx.callbackQuery.data} data`);
// })


// bot.command('mood', async (ctx) =>{
//     //const moodKeyboard = new Keyboard().text('Horosho').row().text('Norm').row().text('Ploho').resized();
// const moodLabels = ['good','bad','ok'];
// const rows = moodLabels.map((label) =>{
//     return [ Keyboard.text(label)]
// })
// const moodKeyboard2 = Keyboard.from(rows).resized();
//     await ctx.reply('Kak dela?',{
//         reply_markup: moodKeyboard2,
//     } );

// })


// bot.command('share', async (ctx) => {
//     const shareKeyboard = new Keyboard().requestLocation('Location').requestContact('Contact').requestPoll('Quetion').resized();
//     shareKeyboard.placeholder('Share data!')
//     await ctx.reply('Чем хочешь поделиться?', {
//         reply_markup: shareKeyboard
//     } )
// })


// bot.on(':contact', async (ctx) =>{
//     await ctx.reply('Thx for contact')
// })

// bot.hears('Horosho', async (ctx) => {

//     await ctx.reply("Nicee!", {
//         reply_markup: {remove_keyboard: true}
//     })
// })




bot.command(['say_smt', 'hi', 'SVO'], async (ctx) =>{
    await ctx.reply('GOIDAAAA!!!');
})

bot.on('msg').filter((ctx) =>{
   return ctx.from.id === 5080089902
}, async (ctx) => {
    await ctx.reply('Hello admin!');
})
//message ->

bot.on('message', async (ctx) =>{
    await ctx.reply("Надо подумать...");
});




bot.catch((err) =>{

    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}`);
    const e = err.error;

    if (e instanceof GrammyError){
        console.error("Error in request: ", e.description);

    }else if(e instanceof HttpError){
        console.error("Could not contact Telegram: ", e);

    } else {
        console.error("Unknown error:", e);
    }
});



bot.start();




