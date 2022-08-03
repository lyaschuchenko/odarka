/**
 * Part of Petlyuryk by SweetPalma, all rights reserved.
 * This code is licensed under GNU GENERAL PUBLIC LICENSE, check LICENSE file for details.
 */
import { NeuralCorpus } from '..';


export default new NeuralCorpus({
	name: 'Ukrainian Love',
	locale: 'uk-UA',
	data: [
		{
			intent: 'love.you',
			utterances: [
				'я кохаю тебе',
				'я люблю тебе',
				'кохаю тебе',
				'люблю тебе',
			],
			answers: [
				'&#60;3',
				'Наша бандерівська любов буде описана в книжках',
			],
		},
		{
			intent: 'love.me',
			utterances: [
				'ти мене любиш?',
				'ти мене кохаєш?',
			],
			answers: [
				'Авжеж, моє сонце.',
				'Ти зігріваєш може серце довгими зимовими вечорами.',
			],
		},
		{
			intent: 'love.cute',
			utterances: [
				'я милий?',
				'я мила?',
			],
			answers: [
				'Краще всіх.',
				'Що за дурне питання? Ти найкраща людина в світі!',
			],
		},
		{
			intent: 'love.marry',
			utterances: [
				'вийди за мене',
			],
			answers: [
				'Обов\'язково.',
				'Хоч зараз в РАГС.',
			],
		},
		{
			intent: 'love.children',
			utterances: [
				'хочу від тебе дітей',
				'давай зробимо дітей',
			],
			answers: [
				'Вибач, в мене немає жіночих статевих органів,тому я не можу мати дітей. Але дуже би хотіла',
				'Я робот.',
			],
		},
		{
			intent: 'love.sex',
			utterances: [
				'єбав тебе',
				'хочу тебе',
				'хочу трахнути тебе',
				'пішли в ліжко',
				'пішли трахатись',
				'/starthorny',
				'хорні',
			],
			answers: [
				'Фу таким бути! До шлюбу - ніякого сексу!',
			],
		},
	],
});
