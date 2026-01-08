const connect = jest.fn();

class MockPost {
  constructor(data) {
    this.title = data.title;
    this.content = data.content;
  }

  save(callback) {
    if (MockPost.__saveError) {
      return callback(MockPost.__saveError);
    }
    return callback(null);
  }

  static find(callback) {
    return callback(MockPost.__findError || null, MockPost.__findResult || []);
  }

  static findOne(query, callback) {
    return callback(
      MockPost.__findOneError || null,
      MockPost.__findOneResult || null
    );
  }

  static __setFindResult(result, error = null) {
    MockPost.__findResult = result;
    MockPost.__findError = error;
  }

  static __setFindOneResult(result, error = null) {
    MockPost.__findOneResult = result;
    MockPost.__findOneError = error;
  }

  static __setSaveError(error = null) {
    MockPost.__saveError = error;
  }
}

const model = jest.fn(() => MockPost);

module.exports = {
  connect,
  model,
  __mockPost: MockPost,
};
