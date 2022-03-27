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
  let root = createElement( element_tree.tagName, element_tree.options, element_tree.cb );
  if( !element_tree.children || element_tree.children.length === 0 ) {
    return root;
  }
  // element_tree.children.forEach( child => {
  //   root.append( createElementByElTree( child ) );
  // } );
  root.append( ...element_tree.children.map( child => createElementByElTree( child ) ) );
  // root.append(el1,el2,el3)
  // ...[le1,le2,le3] => le1,le2,le3
  return root;
};

// Methods are used to obtain dynamic data
const getPageData = () => {
  // console.log( window.location );
  const params  = window.location.search.split( '?' )[ 1 ];
  const query   = params.split( '&' );
  const room_id = query[ 0 ].split( '=' )[ 1 ];
  console.log( room_id );

  //TODO Fill in the data
  const all_rooms = {
    1 : {
      roomListData : [
        {
          title   : '1 Bedroom / 1 Bathroom',
          pic     : {
            url : 'imgs/details/KP1B.JPG',
            alt : 'room 1',
          },
          content : {
            rent    : 'rent: $2,100',
            deposit : '$1,945',
            beds    : '1Be/1Ba',
            area    : 'SQ. FT. 620',
          },
        },
        {
          title   : '3 Bedroom / 2 Bathroom',
          pic     : {
            url : 'imgs/details/KP3B.JPG',
            alt : 'room 1',
          },
          content : {
            rent    : 'rent: $3,510',
            deposit : 'deposit: $1,300',
            beds    : 'beds: 3Be/2Ba',
            area    : 'area: SQ. FT. 1,102',
          },
        },
      ],
      details_data : {
        rules    : {
          title   : 'Rules',
          content : '<p>PETS Allow</p>',
        },
        contact  : {
          title   : 'Contact',
          content : '<p>Phone 413-241-8995</p><br><p>Email ruiw@umass.edu</p>',
        },
        location : {
          title   : 'Location',
          content : '<p>57 E. Pleasant St., Amherst, MA 01002</p>',
        },
        policy   : {
          title   : 'Pets Policy',
          content : '<p>- Pets are welcome here!</p><br><p>- Maximum of 2 pets per apartment</p><br><p>- There is extra pet-rent of $25 / month, flat - regardless of whether you have 1 or 2 pets</p>',
        },
      },
    },
    2 : {
      roomListData : [
        {
          title   : '1 Bedroom / 1 Bathroom',
          pic     : {
            url : 'imgs/details/AS1B.png',
            alt : 'room 1',
          },
          content : {
            rent    : 'rent: $2,199',
            deposit : 'deposit: $1,095',
            beds    : 'beds: 1Bd/1Ba',
            area    : 'area: SQ. FT. 501',
          },
        },
        {
          title   : '3 Bedroom / 2 Bathroom',
          pic     : {
            url : 'imgs/details/AS3B2B.PNG',
            alt : 'room 2',
          },
          content : {
            rent    : 'rent: $3,874',
            deposit : 'deposit: $1,095',
            beds    : 'beds: 3Bd/2Ba',
            area    : 'area: SQ. FT. 1,302',
          },
        },
      ],
      details_data : {
        rules    : {
          title   : 'Rules',
          content : '<p>PETS Allow</p>',
        },
        contact  : {
          title   : 'Contact',
          content : '<p>Phone 413-241-8995</p><br><p>Email ruiw@umass.edu</p>',
        },
        location : {
          title   : 'Location',
          content : '<p>408 Northampton Rd, Amherst, MA 01002</p>',
        },
        policy   : {
          title   : 'Pets Policy',
          content : '<p>- No dogs over 70lbs and no aggressive breeds including Pit Bulls, Rottweilers, Chow Chows, Doberman Pinschers, wolf-hybrids.</p><br><p>- We will occasionally make some exceptions to these rules.</p><br><p>- If you would like to discuss this further, please call the Aspen Heights phone number on the website. </p>',
        },
      },
    },
    3 : {
      roomListData : [
        {
          title   : '1 Bedroom / 1 Bathroom',
          pic     : {
            url : 'imgs/details/North1B.png',
            alt : 'room 1',
          },
          content : {
            rent    : 'rent: $2,010',
            deposit : 'deposit: $1,045',
            beds    : 'beds: 1Bd/1Ba',
            area    : 'area: SQ. FT. 650',
          },
        },
        {
          title   : '3 Bedroom / 2 Bathroom',
          pic     : {
            url : 'imgs/details/North3B.png',
            alt : 'room 1',
          },
          content : {
            rent    : 'rent: $1,260',
            deposit : 'deposit: $1,095',
            beds    : 'beds: 3Bd/2Ba',
            area    : 'area: SQ. FT. 1,149',
          },
        },
       
      ],
      details_data : {
        rules    : {
          title   : 'Rules',
          content : '<p>PETS Allow</p>',
        },
        contact  : {
          title   : 'Contact',
          content : '<p>Phone 855-328-2421</p><br><p>Email ruiw@umass.edu</p>',
        },
        location : {
          title   : 'Location',
          content : '<p>75 Cowls Rd., Amherst, MA 01002</p>',
        },
        policy   : {
          title   : 'Pets Policy',
          content : '<p>- Cats and Dog Allowed</p><br><p>- Rent: $25</p><br><p>- Restrictions: Breed Restrictions Apply. Please call for more details.</p><p>Pet Limit: 2</p>'
          +'<p>Rent: $25</p>'
          +'<p>Restrictions: Breed Restrictions Apply. Please call for more details.</p>'
          ,
        },
      },
    },
    4 : {
      roomListData : [
        {
          title   : '1 Bedroom / 1 Bathroom',
          pic     : {
            url : 'imgs/details/1.JPG',
            alt : 'room 1',
          },
          content : {
            rent    : 'rent: $2,000',
            deposit : 'deposit: $1,300',
            beds    : 'beds: 1Be/1Ba',
            area    : 'area: SQ. FT. 506',
          },
        },
        {
          title   : '4 Bedroom / 2 Bathroom',
          pic     : {
            url : 'imgs/details/OP4B2B.PNG',
            alt : 'room 2',
          },
          content : {
            rent    : 'rent: $1,125',
            deposit : 'deposit: $1,125',
            beds    : 'beds: 4Be/2Ba',
            area    : 'area: SQ. FT. 1307',
          },
        },
      ],
      details_data : {
        rules    : {
          title   : 'Rules',
          content : '<p>PETS Allow</p>',
        },
        contact  : {
          title   : 'Contact',
          content : '<p>Phone 413-241-8995</p><br><p>Email ruiw@umass.edu</p>',
        },
        location : {
          title   : 'Location',
          content : '<p>57 Olympia Drive, Amherst, MA 01002</p>',
        },
        policy   : {
          title   : 'Pets Policy',
          content : '<p>- Dogs and cats are allowed</p><br><p>- Maximum of 2 pets per apartment</p><br><p>- There is extra pet-rent of $25 / month, flat - regardless of whether you have 1 or 2 pets</p>',
        },
      },
    },
  };

  return all_rooms[ room_id ];
};

let details_room_list = [];
details_room_list     = getPageData()
  .roomListData
  .map( ( val, index ) => {
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
            innerText : getPageData().details_data.rules.title,
          },
        },
        {
          tagName : 'div',
          options : {
            innerHTML : getPageData().details_data.rules.content,
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
            innerText : getPageData().details_data.contact.title,
          },
        },
        {
          tagName : 'div',
          options : {
            innerHTML : getPageData().details_data.contact.content,
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
            innerText : getPageData().details_data.location.title,
          },
        },
        {
          tagName : 'div',
          options : {
            innerHTML : getPageData().details_data.location.content,
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
            innerText : getPageData().details_data.policy.title,
          },
        },
        {
          tagName : 'div',
          options : {
            innerHTML : getPageData().details_data.policy.content,
          },
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
    DetailsComponent,
  ],
};

// JS manipulation of the DOM add component (a collection of native tags)
const element = document.getElementById( 'main' );
element.append( createElementByElTree( RootComponent ) );
