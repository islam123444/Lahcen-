const { Client, Intents, Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');

const token = "MTIzODUxODI3MjI0MDkxMDQxOQ.GjKNtb.RxoJaqDaR3luySyw9S_s1Z45jKLR3kcKGZImP0";//توكن بوتك
const guildId = "1227571557551968317";//أيدي سيرفارك
const probotid = "282859044593598464";//أيدي برو بوت
const transferto = "1127270654102732840";//أيدي ألي يتحولو الكريدت عند الشراء
const owner = "1127270654102732840";//أيدي أونر البوت

client.once('ready', async () => {
    console.log(`Bot Started With Name ${client.user.tag}.`);

    const commands = [
        {
            name: 'buy-project',
            description: 'شراء بروجاكتات',
        },
        {
            name: 'project',
            description: 'نفس هذا يبيع بروجكتات 150ك/بروجيكت بوت شوب 50ك',
        }
];
 
try {
    const guild = await client.guilds.fetch(guildId);
    const commandsRegistered = await guild.commands.set(commands);
    console.log(`تم تسجيل ${commandsRegistered.size} أمر سلاش.`);
} catch (error) {
    console.error('حدث خطأ أثناء تسجيل أوامر السلاش', error);
}

});

client.on('interactionCreate', async interaction => {
    if (interaction.commandName === 'buy-project') {
        const row2 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('project_type')
                    .setPlaceholder('أختار من هنا البروجاكت الذي تريد شرائه')
                    .addOptions([
                        {
                            label: 'بروجاكت',
                            value: '1'
                        },
                        {
                            label: 'بروجاكت',
                            value: '2'
                        }
                    ])
            );

        await interaction.reply({ content: '**الرجاء الإختيار بالضغط على الزر في أسفل هذه الرسالة :**', components: [row2] });
    } else if (interaction.commandName === 'project') {
        const projects = new MessageEmbed()
                .setTitle(`**:file_folder: - قائمة البروجاكتات المتوفرة**`)
                .setDescription("**حط هنا أسماء البروجاكتات المتوفرة**")
                .setColor('#0099ff');

            await interaction.reply({ embeds: [projects] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId === 'project_type') {
        const selectedOption = interaction.values[0];

        if (selectedOption) {
            
            const ProjectData = {
                1: {
                    name: "بروجيكت يبيع بروجكتات",//project_name
                    price: 150000,//project_price
                    link: "https://cdn.discordapp.com/attachments/1189949670223532033/1233461945068159026/buy_projects.zip?ex=6640f4f4&is=663fa374&hm=fe4cc93a5bf5c4442a42a83707dc61c5219a4df2047adde4cd14b62d84bc8168&"//project_link
                },
                2: {
                    name: "بوت شوب",//project_name
                    price: 50000,//project_price
                    link: "https://replit.com/@xyous/By-Xyous-BOT-SHOP?v=1#package.json"//project_link
                }
            };
            
            const ProjectData2 = ProjectData[selectedOption];
            const price = ProjectData2.price;
            const pricetax = Math.floor(price * (20) / (19) + (1));

            const transfercredit = new MessageEmbed()
                .setTitle(`**:file_folder: - شراء بروجاكت**`)
                .addField("**نوع البروجاكت :**", `${ProjectData2.name}`)
                .addField("**سعر البروجاكت :**", `${price}`)
                .addField(".", `\`\`\`#credit ${transferto} ${pricetax}\`\`\``)
                .setColor('#0099ff');

            await interaction.reply({ embeds: [transfercredit] });
            
            const filter = (response) =>
                response.author.id === probotid &&
                response.content.includes(`**:moneybag: | ${interaction.user.username}, has transferred \`$${price}\` to <@!${transferto}> **`);

            const collector = await interaction.channel.awaitMessages({ filter, max: 1 });
            const collected = collector.first();
            if (collected) {
                console.log('تحول الكريدت');
                const link = ProjectData2.link;
                const messagedm = new MessageEmbed()
                    .setTitle(`**✅ - تم شراء البروجاكت بنجاح**`)
                    .addField("**نوع البروجاكت :**", `${ProjectData2.name}`)
                    .addField("**سعر البروجاكت :**", `${price}`)
                    .addField("**رابط تحميل البروجاكت :**", `${link}`)
                    .setColor('#0099ff');

                await interaction.user.send({ embeds: [messagedm] });
                
                
                await interaction.channel.send(`**✅ - تم شراء البروجاكت بنجاح**
تم إرسال البروجاكت في الخاص :file_folder:
<@${interaction.user.id}>`);
                
                
            }
        }
    }
});

 
 
client.login(token);
