/**
 * Create the element
 * @param tagName Tag name
 * @param options
 * @param cb The callback
 * @returns {HTMLElement} Created labels
 */

 const createElement = ( tagName, options = {}, cb = undefined ) => {
    let el = document.createElement( tagName );
    el     = Object.assign( el, options );
    if( cb ) {
      return cb( el );
    }
    return el;
  };
  
  /**
   * Create components from element Tree
   * @param element_tree
   * @returns {HTMLElement}
   */
  const createElementByElTree = ( element_tree ) => {
    let root = createElement(
      element_tree.tagName,
      element_tree.options,
      element_tree.cb,
    );
    if( !element_tree.children || element_tree.children.length === 0 ) {
      return root;
    }
    // element_tree.children.forEach( child => {
    //   root.append( createElementByElTree( child ) );
    // } );
    root.append(
      ...element_tree.children.map( ( child ) => createElementByElTree( child ) ),
    );
    // root.append(el1,el2,el3)
    // ...[le1,le2,le3] => le1,le2,le3
    return root;
  };
  let room_id                 = null;
  // Methods are used to obtain dynamic data
  const getPageData           = async() => {
    // console.log( window.location );
    const params = window.location.search.split( '?' )[ 1 ];
    const query  = params.split( '&' );
    room_id      = query[ 0 ].split( '=' )[ 1 ];
    console.log( room_id );
  
    //TODO Fill in the data
    //
  
    // return all_rooms[room_id];
  
    const api = `/rooms?room_id=${room_id}`;
    const res = await fetch( api );
    if( !res.ok ) {
      throw new Error( 'request fail' );
    }
    const data = await res.json();
    return data.data;
  };
  
  const deleteCommentHandle = async function( comment_index ) {
    //fetch
    const deleteResponse = await fetch( '/comment', {
      method  : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
      },
      body    : JSON.stringify( {
        comment_index,
      } ),
    } );
    if( !deleteResponse.ok ) {
      alert( 'erorr info' );
    } else {
      // refresh page
      location.reload();
    }
  };
  
  // request room data
  getPageData()
    .then( async pageData => {
  
      let user_id = null;
      let body    = {};
      if( !!localStorage.getItem( 'userid' ) ) {
        body.id = localStorage.getItem( 'userid' );
      }
      const allinfo = await fetch( '/IneedInfo', {
        method  : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body    : JSON.stringify( body ),
      } );
      thisuser      = ( await allinfo.json() );
  
      if( allinfo.ok && thisuser.code === 0 ) {
        console.log( thisuser.data );
        user_id = thisuser.data.id;
      }
  
      let details_room_list = [];
      details_room_list     = pageData.roomListData.map( ( val, index ) => {
        return {
          tagName  : 'li',
          children : [
            {
              tagName : 'div',
              options : {
                className : 'li-title',
                innerText : val.title,
              },
            },
            {
              tagName  : 'div',
              options  : {
                className : 'li-pic',
              },
              children : [
                {
                  tagName : 'img',
                  options : {
                    src : val.pic.url, //"imgs/details/1.JPG",
                    alt : val.pic.alt, //'room 1'
                  },
                },
              ],
            },
            {
              tagName  : 'div',
              options  : {
                className : 'li-content',
              },
              children : [
                {
                  tagName  : 'ul',
                  children : [
                    {
                      tagName : 'li',
                      options : {
                        innerText : val.content.rent,
                      },
                    },
                    {
                      tagName : 'li',
                      options : {
                        innerText : val.content.deposit,
                      },
                    },
                    {
                      tagName : 'li',
                      options : {
                        innerText : val.content.beds,
                      },
                    },
                    {
                      tagName : 'li',
                      options : {
                        innerText : val.content.area,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        };
      } );
  
      /**
       * Follow the following format:
       * > Component Component classes
       *     let el_tree    = {
       *       tagName  : 'string',
       *       options  : {
       *         ...attr of HTMLElement
       *       },
       *       cb       : (el) => {
       *         return el;
       *       },
       *       children : [child1<el_tree>,chile2<el_tree>],
       *     };
       */
      const HeaderComponent = {
        tagName  : 'header',
        options  : {
          className : 'details-title',
        },
        children : [
          {
            tagName : 'h1',
            options : {
              innerHTML : 'Our Floor Plans',
            },
          },
        ],
      };
  
      const RoomListComponent = {
        tagName  : 'section',
        options  : {
          className : 'details-room-list',
        },
        children : [
          {
            tagName  : 'ul',
            children : details_room_list,
          },
        ],
      };
  
      const DetailsComponent = {
        tagName  : 'section',
        options  : {
          className : 'details-info',
        },
        children : [
          // rules
          {
            tagName  : 'div',
            options  : {
              className : 'rules',
            },
            children : [
              {
                tagName : 'h2',
                options : {
                  innerText : pageData.details_data.rules.title,
                },
              },
              {
                tagName : 'div',
                options : {
                  innerHTML : pageData.details_data.rules.content,
                },
              },
            ],
          },
          // contact
          {
            tagName  : 'div',
            options  : {
              className : 'contact',
            },
            children : [
              {
                tagName : 'h2',
                options : {
                  innerText : pageData.details_data.contact.title,
                },
              },
              {
                tagName : 'div',
                options : {
                  innerHTML : pageData.details_data.contact.content,
                },
              },
            ],
          },
          // location
          {
            tagName  : 'div',
            options  : {
              className : 'location',
            },
            children : [
              {
                tagName : 'h2',
                options : {
                  innerText : pageData.details_data.location.title,
                },
              },
              {
                tagName : 'div',
                options : {
                  innerHTML : pageData.details_data.location.content,
                },
              },
            ],
          },
          // policy
          {
            tagName  : 'div',
            options  : {
              className : 'policy',
            },
            children : [
              {
                tagName : 'h2',
                options : {
                  innerText : pageData.details_data.policy.title,
                },
              },
              {
                tagName : 'div',
                options : {
                  innerHTML : pageData.details_data.policy.content,
                },
              },
            ],
          },
        ],
      };
  
      //the comments module, MS2 added
      const MoreWordsComponent = {
        tagName  : 'section',
        options  : {
          className : 'comment-div', // tag class
        },
        children : [
          // words
          {
            tagName  : 'div',
            options  : {
              className : 'words',
            },
            children : [
              {
                tagName : 'input',
                options : {
                  className   : 'words-input',
                  id          : 'comment-text',
                  type        : 'text', // receive the input text by user, a input writting pad
                  placeholder : 'type your saying...',
                },
              },
              {
                tagName : 'input',
                options : {
                  className : 'words-button',
                  type      : 'button', // submit botton
                  value     : 'submit',
                  onclick   : async( event ) => {
                    // get comments
                    const content = document.getElementById( 'comment-text' ).value;
                    // API in browser, get id from above(id:"comment-text"). Then, we can get the inputed data by user.
                    if( !user_id ) {
                      alert( 'need to login' );
                      return;
                    }
                    if( content ) {
                      const url  = '/comment'; //request url
                      const body = {
                        room_id : room_id,
                        user_id : user_id, //userID
                        content : content,
                      };//body package will be send to backend, and will be decapsulated.
  
                      //use fetch api to send a request
                      //fetch return promise, which is asynchronus. Use await to change it into synchronus.
                      const res = await fetch( url, {
                        method  : 'POST',
                        headers : {
                          'content-type' : 'application/json',
                        },
                        body    : JSON.stringify( body ),
                      } );
  
                      if( res.ok ) { // RESPONSE CODE 200
                        location.reload(); //refresh current page, let user view the newese comments.
                      }
                    }
                    // send request
                    // renew comments list
                  },
                },
              },
              {
                tagName : 'p',
                options : {
                  innerText : 'Comments:',
                },
              },
              {
                tagName  : 'ul',
                children : pageData.comment ? pageData.comment.map( ( val, index ) => {
                  const btn = `<button onclick="deleteCommentHandle(${val.comment_id})">Delete</button>`;
                  console.log( index, val );
                  return {
                    tagName : 'li',
                    options : {
                      innerHTML : `${val.user_id}-${val.content} ${val.user_id == user_id ? btn : ''}`, //user id and comment content
                    },
                  };
                } ) : [],
              },
            ],
          },
        ],
      };
  
      // Root
      let RootComponent = {
        tagName  : 'div',
        options  : {
          className : 'details',
        },
        children : [
          HeaderComponent,
          RoomListComponent,
          MoreWordsComponent,
          DetailsComponent,
        ],
      };
  
      // JS manipulation of the DOM add component (a collection of native tags)
      const element = document.getElementById( 'main' );
      element.append( createElementByElTree( RootComponent ) );
    } )
    .catch( err => {
      console.log( err );
    } );
  