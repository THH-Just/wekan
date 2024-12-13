Scanning = {
  processDocument(doc) {
    if (typeof doc !== 'object' || !doc.title) {
      throw new Error('Invalid argument: doc must be an object with a title property');
    }
    console.log('Dokument wird verarbeitet:', doc);
    return true;
  }
};

