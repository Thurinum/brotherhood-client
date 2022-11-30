import { style, animate, trigger, transition } from '@angular/animations';

export const ZoomAnimation = trigger("zoom-animation", [
	transition(":enter", [
		style({ opacity: 0, scale: 0.9, height: 0 }),
		animate('0.7s ease-out',
			style({ opacity: 1, scale: 1 }))
	]),
	transition(':leave', [
		style({ opacity: 1, scale: 1 }),
		animate('0.5s ease-in',
			style({ opacity: 0, scale: 0.9 }))
	])
]);

export const FormAnimation = trigger("form-animation", [
	transition(":enter", [
		style({ opacity: 0, backdropFilter: "blur(0px)", scale: 1.25 }),
		animate('0.3s ease-out',
			style({ opacity: 1, backdropFilter: "blur(50px)", scale: 1 }))
	]),
	transition(':leave', [
		style({ opacity: 1, backdropFilter: "blur(50px)", scale: 1 }),
		animate('0.3s ease-in',
			style({ opacity: 0, backdropFilter: "blur(0px)", scale: 0.75 }))
	])
]);

export const SlideAnimation = trigger("slide-animation", [
	transition(":enter", [
		style({ transform: "translateX(-100px) scaleY(0)", opacity: 0 }),
		animate('0.7s cubic-bezier(0.8, 0.15, 0.2, 1)',
			style({ transform: "translateX(0) scaleY(1)", opacity: 1 }))
	]),
	transition(':leave', [
		style({ transform: "translateX(0px) scaleY(1)", opacity: 1 }),
		animate('0.3s cubic-bezier(0.8, 0.15, 0.2, 1)',
			style({ transform: "translateX(100px) scaleY(0)", opacity: 0 }))
	])
]);
