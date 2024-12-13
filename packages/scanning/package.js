Package.describe({
  name: 'wekan:scanning',
  version: '0.0.1',
  summary: 'Fügt Scanning-Funktionalitäten hinzu.',
  git: 'https://github.com/username/scanning-plugin',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('ecmascript'); // Abhängigkeiten angeben
  api.addFiles('scanning.js', 'server'); // Serverseitige Logik
  api.export('Scanning'); // Exportieren, falls es global benötigt wird
});
