/**
 * Part of Petlyuryk by SweetPalma, all rights reserved.
 * This code is licensed under GNU GENERAL PUBLIC LICENSE, check LICENSE file for details.
 */
import axios from 'axios';
import { NeuralCorpus } from '..';


const getStatesWithAlerts = async () => {
	type Result = {	states: { [key: string]: { enabled: boolean } } };
	const { data } = await axios.get<Result>('https://emapa.fra1.cdn.digitaloceanspaces.com/statuses.json');
	return Object.keys(data.states).filter(key => data.states[key].enabled);
};


export default new NeuralCorpus({
	name: 'Ukrainian Misc',
	locale: 'uk-UA',
	data: [
		{
			intent: 'alert.all',
			utterances: [
				'де тривога',
				'де небезпечно',
				'де вибухи',
				'де сирена',
			],
			async handler(nlp, response) {
				try {
					const statesWithAlert = await getStatesWithAlerts();
					if (statesWithAlert.length > 0) {
						const title = '<b>СИРЕНИ ЛУНАЮТЬ В НАСТУПНИХ РЕГІОНАХ</b>\n';
						response.answer = [ title, ...statesWithAlert ].join('\n');
					} else {
						response.answer = 'Все спокійно, тривог ніде немає.';
					}
				} catch (error) {
					response.answer = 'Щось зламалось, спробуй пізніше.';
				}
			},
		},
		{
			intent: 'alert.rate',
			utterances: [
				'рівень небезпеки',
				'рівень тривоги',
			],
			async handler(nlp, response) {
				try {
					const statesWithAlertCount = (await getStatesWithAlerts()).length;
					if (statesWithAlertCount < 1) {
						response.answer = 'Все спокійно, тривог ніде немає.';
					} else if (statesWithAlertCount < 3) {
						response.answer = `Відносно спокійно, сирена лунає у ${statesWithAlertCount} регіонах.`;
					} else if (statesWithAlertCount < 6) {
						response.answer = `Неспокійно, сирена лунає у ${statesWithAlertCount} регіонах.`;
					} else {
						response.answer = `Тривога активна у ${statesWithAlertCount} регіонах, всі в укриття.`;
					}
				} catch (error) {
					response.answer = 'Щось зламалось, спробуй пізніше.';
				}
			},
		},
		{
			intent: 'alert.sandwich',
			utterances: [
				'бутери',
				'бутер',
			],
			answers: [
				'урааааа бутери',
				'Фі, бутери... От як би суші....',
				'Бутер з сечею - кращий початок дня для кацапа.',
				'В мене немає рота, але я мушу кричати.',
				'Бутери - це соціальний конструкт.',
				'Бутерів не існує.',
				'Я не голодна, дякую.',
			],
		},
	],
});
