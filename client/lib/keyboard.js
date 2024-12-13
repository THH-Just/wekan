import { ReactiveCache } from '/imports/reactiveCache';

// XXX There is no reason to define these shortcuts globally, they should be
// attached to a template (most of them will go in the `board` template).

window.addEventListener('keydown', (e) => {
  // Only handle event if coming from body
  if (e.target !== document.body) return;

  // Only handle event if it's in another language
  if (String.fromCharCode(e.which).toLowerCase() === e.key) return;

  // Trigger the corresponding action
  Mousetrap.trigger(String.fromCharCode(e.which).toLowerCase());
});

function getHoveredCardId() {
  const card = $('.js-minicard:hover').get(0);
  if (!card) return null;
  return Blaze.getData(card)._id;
}

function getSelectedCardId() {
  return Session.get('currentCard') || Session.get('selectedCard') || getHoveredCardId();
}

Mousetrap.bind('?', () => {
  FlowRouter.go('shortcuts');
});

Mousetrap.bind('w', () => {
  if (Sidebar.isOpen() && Sidebar.getView() === 'home') {
    Sidebar.toggle();
  } else {
    Sidebar.setView();
  }
});

Mousetrap.bind('q', () => {
  const currentBoardId = Session.get('currentBoard');
  const currentUserId = Meteor.userId();
  if (currentBoardId && currentUserId) {
    Filter.members.toggle(currentUserId);
  }
});

Mousetrap.bind('a', () => {
  const currentBoardId = Session.get('currentBoard');
  const currentUserId = Meteor.userId();
  if (currentBoardId && currentUserId) {
    Filter.assignees.toggle(currentUserId);
  }
});

Mousetrap.bind('x', () => {
  if (Filter.isActive()) {
    Filter.reset();
  }
});

Mousetrap.bind('f', () => {
  if (Sidebar.isOpen() && Sidebar.getView() === 'filter') {
    Sidebar.toggle();
  } else {
    Sidebar.setView('filter');
  }
});

Mousetrap.bind('/', () => {
  if (Sidebar.isOpen() && Sidebar.getView() === 'search') {
    Sidebar.toggle();
  } else {
    Sidebar.setView('search');
  }
});

Mousetrap.bind(['down', 'up'], (evt, key) => {
  if (!Utils.getCurrentCardId()) {
    return;
  }

  const nextFunc = key === 'down' ? 'next' : 'prev';
  const nextCard = $('.js-minicard.is-selected')
    [nextFunc]('.js-minicard')
    .get(0);
  if (nextCard) {
    const nextCardId = Blaze.getData(nextCard)._id;
    Utils.goCardId(nextCardId);
  }
});

numbArray = _.range(1,10).map(x => 'shift+'+String(x))
Mousetrap.bind(numbArray, (evt, key) => {
  num = parseInt(key.substr(6, key.length));
  const currentUserId = Meteor.userId();
  if (currentUserId === null) {
    return;
  }
  const currentBoardId = Session.get('currentBoard');
  board = ReactiveCache.getBoard(currentBoardId);
  labels = board.labels;
  if(MultiSelection.isActive())
  {
    const cardIds = MultiSelection.getSelectedCardIds();
    for (const cardId of cardIds)
    {
      card = ReactiveCache.getCard(cardId);
      if(num <= board.labels.length)
      {
        card.removeLabel(labels[num-1]["_id"]);
      }
    }
  }
});

numArray = _.range(1,10).map(x => String(x))
Mousetrap.bind(numArray, (evt, key) => {
  num = parseInt(key);
  const currentUserId = Meteor.userId();
  const currentBoardId = Session.get('currentBoard');
  if (currentUserId === null) {
    return;
  }
  board = ReactiveCache.getBoard(currentBoardId);
  labels = board.labels;
  if(MultiSelection.isActive() && ReactiveCache.getCurrentUser().isBoardMember())
  {
    const cardIds = MultiSelection.getSelectedCardIds();
    for (const cardId of cardIds)
    {
      card = ReactiveCache.getCard(cardId);
      if(num <= board.labels.length)
      {
        card.addLabel(labels[num-1]["_id"]);
      }
    }
    return;
  }

  const cardId = getSelectedCardId();
  if (!cardId) {
    return;
  }
  if (ReactiveCache.getCurrentUser().isBoardMember()) {
    const card = ReactiveCache.getCard(cardId);
    if(num <= board.labels.length)
    {
      card.toggleLabel(labels[num-1]["_id"]);
    }
  }
});

Mousetrap.bind('m', evt => {
  const cardId = getSelectedCardId();
  if (!cardId) {
    return;
  }

  const currentUserId = Meteor.userId();
  if (currentUserId === null) {
    return;
  }

  if (ReactiveCache.getCurrentUser().isBoardMember()) {
    const card = ReactiveCache.getCard(cardId);
    card.toggleAssignee(currentUserId);
    // We should prevent scrolling in card when spacebar is clicked
    // This should do it according to Mousetrap docs, but it doesn't
    evt.preventDefault();
  }
});

Mousetrap.bind('space', evt => {
  const cardId = getSelectedCardId();
  if (!cardId) {
    return;
  }

  const currentUserId = Meteor.userId();
  if (currentUserId === null) {
    return;
  }

  if (ReactiveCache.getCurrentUser().isBoardMember()) {
    const card = ReactiveCache.getCard(cardId);
    card.toggleMember(currentUserId);
    // We should prevent scrolling in card when spacebar is clicked
    // This should do it according to Mousetrap docs, but it doesn't
    evt.preventDefault();
  }
});

Mousetrap.bind('`', evt => {
  const cardId = getSelectedCardId();
  if (!cardId) {
    return;
  }

  const currentUserId = Meteor.userId();
  if (currentUserId === null) {
    return;
  }

  if (Utils.canModifyBoard()) {
    const card = ReactiveCache.getCard(cardId);
    card.archive();
    // We should prevent scrolling in card when spacebar is clicked
    // This should do it according to Mousetrap docs, but it doesn't
    evt.preventDefault();
  }
});

// Same as above, this time for Persian keyboard.
// https://github.com/wekan/wekan/pull/5589#issuecomment-2516776519
Mousetrap.bind('÷', evt => {
  const cardId = getSelectedCardId();
  if (!cardId) {
    return;
  }

  const currentUserId = Meteor.userId();
  if (currentUserId === null) {
    return;
  }

  if (Utils.canModifyBoard()) {
    const card = ReactiveCache.getCard(cardId);
    card.archive();
    // We should prevent scrolling in card when spacebar is clicked
    // This should do it according to Mousetrap docs, but it doesn't
    evt.preventDefault();
  }
});

Mousetrap.bind('n', evt => {
  const cardId = getSelectedCardId();
  if (!cardId) {
    return;
  }

  const currentUserId = Meteor.userId();
  if (currentUserId === null) {
    return;
  }

  if (Utils.canModifyBoard()) {
    // Find the current hovered card
    const card = ReactiveCache.getCard(cardId);

    // Find the button and click it
    $(`#js-list-${card.listId} .list-body .minicards .open-minicard-composer`).click();

    // We should prevent scrolling in card when spacebar is clicked
    // This should do it according to Mousetrap docs, but it doesn't
    evt.preventDefault();
  }
});

Template.keyboardShortcuts.helpers({
  mapping: [
    {
      keys: ['w'],
      action: 'shortcut-toggle-sidebar',
    },
    {
      keys: ['q'],
      action: 'shortcut-filter-my-cards',
    },
    {
      keys: ['a'],
      action: 'shortcut-filter-my-assigned-cards',
    },
    {
      keys: ['n'],
      action: 'add-card-to-bottom-of-list',
    },
    {
      keys: ['f'],
      action: 'shortcut-toggle-filterbar',
    },
    {
      keys: ['/'],
      action: 'shortcut-toggle-searchbar',
    },
    {
      keys: ['x'],
      action: 'shortcut-clear-filters',
    },
    {
      keys: ['?'],
      action: 'shortcut-show-shortcuts',
    },
    {
      keys: ['ESC'],
      action: 'shortcut-close-dialog',
    },
    {
      keys: ['@'],
      action: 'shortcut-autocomplete-members',
    },
    {
      keys: ['SPACE'],
      action: 'shortcut-add-self',
    },
    {
      keys: ['n'],
      action: 'shortcut-assign-self',
    },
    {
      keys: ['`', '÷'],
      action: 'archive-card',
    },
    {
      keys: ['number keys 1-9'],
      action: 'toggle-labels'
    },
    {
      keys: ['shift + number keys 1-9'],
      action: 'remove-labels-multiselect'
    },
  ],
});
