/** 
 * DevNet Hackathon Demo - Collaboration
 * "Manually" announce session schedule from Room Device
*/

//xAPIの呼び出し
const xapi = require('xapi');

//xAPIイベントの定義 - ボタンが押された時に、markdown functionを実行して、Webex Teamsに結果をプッシュ
xapi.event.on('UserInterface Extensions Event Clicked Signal', (widgetId) => {
    console.log(`new event from widget: ${widgetId}`)

    let markdown = buildMarkdownForTimetable(widgetId)
    push(markdown)
})

//タイムテーブルディクショナリの内容をMarkdown形式で整形するためのfucntionを定義
function buildMarkdownForTimetable(widgetId) {

    let markdown =  `no session found for widget identifier: ${widgetId}`
    let timetable = timetables[widgetId]
    if (timetable) {
        console.log(`found session with id: ${widgetId}`)
        markdown = `**${timetable.day}, ${timetable.time}: ${timetable.id}. ${timetable.title}**`
        markdown += `<br/>_${timetable.description}_`
    }

    return markdown
}

//各タイムテーブルの内容を格納
const timetables = {}
timetables['opening'] = {
    id: '1',
    title: 'オープニング',
    description: '開会の挨拶、および、ハッカソンの趣旨・概要を説明いたします。',
    day: 'Hackathon - Day 1',
    time: '9:30'
}
timetables['guidance'] = {
    id: '2',
    title: 'ガイダンス',
    description: 'この2日間の進め方についてのガイダンスとシスコプロクターを紹介いたします。',
    day: 'Hackathon - Day 1',
    time: '9:45'
}
timetables['demo'] = {
    id: '3',
    title: 'デモ',
    description: 'アイデアソンを始める前に、シスコエンジニアにより簡単なデモを行います。この時間をぜひアイデアの創出のためにご活用ください。',
    day: 'Hackathon - Day 1',
    time: '10:00'
}
timetables['ideathon'] = {
    id: '4',
    title: 'アイデアソン',
    description: 'ハッカソンで開発するためのアイデアを創出する時間です。個別、または、近くの方と簡単なアイデアをポストイットに記述に書き下ろしてみてください。事前にアイデアを考えてきてくれた方は積極的に発表してみてください！',
    day: 'Hackathon - Day 1',
    time: '11:00'
}
timetables['day1_lunch'] = {
    id: '5',
    title: 'ランチ',
    description: 'ランチタイムになります。午後からのハッカソンのために英気を養いつつ、周りの参加者の方と積極的にご交流ください。',
    day: 'Hackathon - Day 1',
    time: '12:30'
}
timetables['election_and_teaming'] = {
    id: '6',
    title: 'アイデア投票・チーム分け',
    description: '皆様にお考えいただいたアイデアの中から、10個投票により選出いたします。お一人当たり二票投票をお願いいたします。10個のアイデアが決まった後、ハックしたいアイデアごとにチームに分かれて、着席してください。1チーム5名、かつ、確約周りの方を最低1人含むようバランス良くチームを構成いただけますようご協力お願いいたします。',
    day: 'Hackathon - Day 1',
    time: '13:30'
}
timetables['scoring_criteria'] = {
    id: '7',
    title: 'チームワークのガイダンス・評価基準・評価者の紹介',
    description: 'これ以降、2日間このチームでハッカソンを進める形になります。それぞれのチーム内で簡単な自己紹介・役割分担を行ってください。また、チームガイダンスに従い、「チーム名」を決めてください。最後に、ハッカソンの評価基準と評価者のご紹介を行います。',
    day: 'Hackathon - Day 1',
    time: '15:00'
}
timetables['hackathon'] = {
    id: '8',
    title: 'ハッカソンスタート！',
    description: 'いよいよハッカソンスタートです！2日間頑張りましょう！わからないことがあれば、遠慮なく近くにいるプロクター、もしくは、Webex Teams内の各テクノロジーごとのQ&amp;Aスペースをご活用ください。',
    day: 'Hackathon - Day 1',
    time: '15:30'
}
timetables['cleanup'] = {
    id: '9',
    title: '片付け',
    description: '20:30をもちまして会場が閉鎖となりますため、各自片付けを開始するようご協力お願いいたします。',
    day: 'Hackathon - Day 1',
    time: '20:15'
}
timetables['closing'] = {
    id: '10',
    title: 'Day 1 - クローズ',
    description: 'この時間を持ちまして、Hackathon - Day 1を終了いたします。皆さまお疲れ様でした！明日は9:00AMから開始になります。お気をつけてお帰りください。',
    day: 'Hackathon - Day 1',
    time: '20:30'
}
timetables['day2_start'] = {
    id: '11',
    title: 'Day 2 スタート！',
    description: 'Hackathon - Day 2を開始します。14:00PMまでの5時間頑張りましょう！',
    day: 'Hackathon - Day 2',
    time: '9:00'
}
timetables['day2_lunch'] = {
    id: '12',
    title: 'チームワークのガイダンス・評価基準・評価者の紹介',
    description: 'ランチの提供を開始いたします。残り2時間。。ご飯を食べてラストスパート！',
    day: 'Hackathon - Day 2',
    time: '12:00'
}
timetables['presentation'] = {
    id: '13',
    title: 'ハッカソンスタート！',
    description: 'チームごとに持ち時間10分(Q&A含)で成果物の発表をしてください。プレゼンテーションの形式は問いませんが、可能な限り、チームの全員が発言できるよう工夫していただけますと幸いです。',
    day: 'Hackathon - Day 2',
    time: '14:00'
}
timetables['result'] = {
    id: '14',
    title: '結果発表',
    description: '結果発表と上位3チームの表彰を行います。結果の良し悪しに一喜一憂せず、お互いの健闘を讃えあいましょう！',
    day: 'Hackathon - Day 2',
    time: '16:30'
}
timetables['party'] = {
    id: '15',
    title: 'ネットワーキングパーティ',
    description: '皆様2日間本当にお疲れ様でした。この機会に全ての垣根を越えて、参加者皆と繋がりましょう！',
    day: 'Hackathon - Day 2',
    time: '17:00'
}

//Webex Teamsにプッシュするためのfucntionを定義
function push(msg, cb) {

    //自分の Bot Token を入力
    const token = "<My Bot Token>"
    //Botを動かす Webex Teams Space の Room ID を入力
    const roomId = "<Webex Teams Room ID>"

    //呼び出す Lambda 関数に受け渡す引数・ペイロード
    let payload = {
        "markdown": msg,
        "roomId": roomId
    }
    xapi.command(
        'HttpClient Post',
        {
            Header: ["Content-Type: application/json", "Authorization: Bearer " + token],
            url: "https://api.ciscospark.com/v1/messages",
            AllowInsecureHTTPS: "True"
        },
        JSON.stringify(payload))
        .then((response) => {
            if (response.StatusCode == 200) {
                console.log("SUCCESS")
                console.log("message pushed to Webex Teams")
                if (cb) cb(null, response.StatusCode)
                return
            }

            console.log("failed with status code: " + response.StatusCode)
            if (cb) cb("failed with status code: " + response.StatusCode, response.StatusCode)
        })
        .catch((err) => {
            console.log("failed with err: " + err.message)
            if (cb) cb("Could not post message to Webex Teams")            
        })
}

console.log('listening...')
