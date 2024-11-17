fx_version 'cerulean'
game 'gta5'
version '1.0.2'
author 'aiakoscodem'



client_scripts {
	'client/*.lua',
}


ui_page "html/index.html"

files {
	'html/index.html',
	'html/css/*.css',
	'html/fonts/*.TTF',
	'html/fonts/*.*',
	'html/sound/*.*',
	'html/images/**/*.png',
	'html/images/**/**/*.png',
	'html/js/*.js',
	'html/js/**/*.js',
	'html/images/**/*.png',
	'html/pages/**/*.js',
	'html/pages/**/*.html',
}

escrow_ignore {
	'client/example.lua',
	'client/main.lua',
}


lua54 'yes'


export 'OpenTextUI'
export 'CloseTextUI'

dependency '/assetpacks'