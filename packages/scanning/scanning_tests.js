Tinytest.add('Scanning - processDocument', function(test) {
  const result = Scanning.processDocument({ title: 'Testdoc' });
  test.equal(result, true, 'Dokument sollte erfolgreich verarbeitet werden');
});
