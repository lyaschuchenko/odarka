/**
 * Part of Petlyuryk by SweetPalma, all rights reserved.
 * This code is licensed under GNU GENERAL PUBLIC LICENSE, check LICENSE file for details.
 */
import { sample } from 'lodash';
import UaResponseHostileShort from '../data/responses/ua-hostile-short.json';
import { Controller } from '../controller';
import { logger } from '../logger';
import * as rgx from './utils';


/**
 * RegExp reply structure.
 */
type Reply = {
	intent: string;
	probability?: number;
	triggers: Array<RegExp>;
	responses: Array<string>;
};


/**
 * RegExp reply database.
 */
const replies: Array<Reply> = [

	// Glory to Ukraine:
	{
		intent: 'glory.capitalize',
		triggers: [
			rgx.matchPart(/україна/), // case sensitive
		],
		responses: [
			'Україна пишеться з великої букви, довбню.',
		],
	},
	{
		intent: 'glory.ukraine',
		triggers: [
			rgx.matchEnd(/Слава Україні/i),
		],
		responses: [
			'Героям Слава!',
		],
	},
	{
		intent: 'glory.nation',
		triggers: [
			rgx.matchEnd(/Слава Нації/i),
		],
		responses: [
			'Смерть ворогам!',
		],
	},
	{
		intent: 'glory.over',
		triggers: [
			rgx.matchFull(/Україна/i),
		],
		responses: [
			'Понад усе!',
		],
	},

	// Bandera:
	{
		intent: 'bandera.father',
		triggers: [
			rgx.matchFull(/батько наш - бандера/i),
			rgx.matchFull(/батько наш бандера/i),
		],
		responses: [
			'Україна - мати!',
		],
	},
	{
		intent: 'bandera.fight',
		triggers: [
			rgx.matchFull(/ми за україну/i),
		],
		responses: [
			'Будем воювати.',
		],
	},

	// Kyiv:
	{
		intent: 'kyiv',
		triggers: [
			rgx.matchPart(/ки?їв(а|у|ом)/i),
			rgx.matchPart(/ки?ївськ(а|е|ий)/i),
			rgx.matchPart(/ки?ян(и|ин|ка)/i),
		],
		responses: [
			'Київ – кращий зі світів.',
			'Чи є міста, кращі за Київ?',
			'Я знов плакала усю ніч від щастя, коли згадала, що я з Києва.',
			'Боже, дякую що я у Києві - хлопці косяками, бидло боїться.',
			'Київ - це божий дар Україні.',
			'Київ – новий Бабилон.',
			'Київ - четветрий Рим.',
		],
	},

	// Belarus:
	{
		intent: 'belarus',
		triggers: [
			rgx.matchPart(/Жыве Беларусь/i),
			rgx.matchPart(/Живе Білорусь/i),
		],
		responses: [
			'Ще не вмерла.',
		],
	},

	// Russian warship go fuck yourself:
	{
		intent: 'warship',
		triggers: [
			rgx.matchFull(/рус(ь|с)кий во(є|е)нн(и|ы|ьі)й кораб(е)?ль/i),
		],
		responses: [
			'Йди нахуй!',
		],
	},

	// Russophobic:
	{
		intent: 'russophobia.short',
		triggers: [
			rgx.matchFull(/наша русофоб(і|и)я/i),
			rgx.matchFull(/русофоб(і|и)я/i),
		],
		responses: [
			'Недостатня.',
		],
	},
	{
		intent: 'russophobia.long',
		triggers: [
			rgx.matchPart(/русофоб(і|и)я/i),
		],
		responses: [
			'Друзі, наша русофобія недостатня.',
		],
	},

	// Putin:
	{
		intent: 'putin.short',
		triggers: [
			rgx.matchFull(/(путин|путін)/i),
		],
		responses: [
			'Хуйло!',
		],
	},
	{
		intent: 'putin.long',
		triggers: [
			rgx.matchPart(/(путин|путін)/i),
		],
		responses: [
			'Путін - хуйло.',
		],
	},

	// Arestovych:
	{
		intent: 'arestovych',
		triggers: [
			rgx.matchPart(/п(и|і)здоболич/i),
			rgx.matchPart(/арестович/i),
		],
		responses: [
			'Арестович - малорос.',
			'Арестович - піздобол.',
			'Арестович - лох.',
		],
	},

	// Avakov:
	{
		intent: 'avakov',
		triggers: [
			rgx.matchPart(/аваков/i),
		],
		responses: [
			'Аваков - чорт.',
		],
	},

	// Shrek:
	{
		intent: 'shrek',
		triggers: [
			rgx.matchPart(/шрек/i),
		],
		responses: [
			'Шрек - це любов.',
			'Шрек - це життя.',
			'Слава Шреку!',
		],
	},

	// Retarded jokes:
	{
		intent: 'joke.a',
		triggers: [
			rgx.matchFull(/а/i),
		],
		responses: [
			'Не акай мені тут',
		],
	},
	{
		intent: 'joke.da',
		triggers: [
			rgx.matchEnd(/да/i),
		],
		responses: [
			'Волосата пізда',
		],
	},
	{
		intent: 'joke.ni.greetings',
		probability: 0.2,
		triggers: [ rgx.matchFull(/ні/i) ],
		responses: [
			'Hello! (Чи то було українською?)',
			'Привіт.',
		],
	},
	{
		intent: 'joke.ni.other',
		triggers: [ rgx.matchEnd(/мені/i) ],
		responses: [
			'Рука в гавні.',
			'Рука в гімні.',
			'Рука в гівні.',
		],
	},
	{
		intent: 'joke.ne',
		triggers: [
			rgx.matchEnd(/нє/i),
		],
		responses: [
			'Рука в гавнє.',
		],
	},
	{
		intent: 'joke.net',
		triggers: [
			rgx.matchEnd(/(нєт|нет)/i),
		],
		responses: [
			'Підора атвєт.',
		],
	},
	{
		intent: 'dambass',
		triggers: [
			rgx.matchFull(/(8 лет|восе(и)мь лет)/i),
		],
		responses: [
			'Я за рульом була.',
			'Скидала бомби на рускіх детей Дамбазза.',
		],
	},
	{
		intent: 'dambass',
		triggers: [
			rgx.matchPart(/бомбили/i),
		],
		responses: [
			'Була за штурвалом.',
			'Рускіє дєті не хатят жить',
			'То не я',
		],
	},
	{
		intent: 'joke.ya',
		triggers: [
			rgx.matchFull(/я/i),
		],
		responses: [
			'Головка від хуя.',
		],
	},


];


/**
 * Petlyuryk RegExp utilities.
 */
export * from './utils';


/**
 * Petlyuryk RegExp processor module.
 */
export default async (controller: Controller, testMode = false) => {
	logger.info('regexp:ready');
	controller.addHandler(async (request) => {
		const { id, text } = request;
		for (const reply of replies) {
			for (const trigger of reply.triggers) {
				if (!text.match(trigger)) {
					continue;
				}
				if (!testMode && reply.probability && Math.random() > reply.probability) {
					continue;
				}
				const randomResponse = sample(reply.responses);
				return (!randomResponse) ? undefined : {
					intent: `regexp.${reply.intent}`,
					text: randomResponse,
					replyTo: {
						messageId: id,
					},
				};
			}
		}
	});
};
