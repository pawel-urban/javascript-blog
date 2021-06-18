'use strict';
{

  const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  allAuthorsLink: Handlebars.compile(document.querySelector('#template-all-authors-link').innerHTML),
  };

  const opt = {
    article: {
      Selector: '.post',
    },
    tagSizes: {
      count: 5,
      Prefix: 'tag-size-',
    },
  };
  const optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorsSelector = '.post .post-author',
        optTagsListSelector = '.tags .list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-',
        optAuthorsListSelector = '.list .authors';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    let html = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(opt.article.Selector + customSelector);

    for(let article of articles){
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /*[DONE] create HTML of the link */
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags) {
     const params = {};
           params.max = 0;
           params.min = 999999;

     for (let tag in tags) {

       if (tags[tag] > params.max) {
          params.max = tags[tag];
       }
       if (tags[tag] < params.min) {
          params.min = tags[tag];
       }
     }
     return params;
   }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.tagSizes.count - 2) + 1);
    return optCloudClassPrefix + classNumber;
  }


  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(opt.article.Selector);
    /* [DONE] START LOOP: for every article: */
    for(let article of articles){
      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* [DONE] generate HTML of the link */
        const linkHTMLData = { tag: tag };
        const linkHTML = templates.tagLink(linkHTMLData);
        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeend', html);
    /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] create variable for all links HTML code */
    const allTagsData = { tags: [] };
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  generateTags();

  function tagClickHandler(event){
    /*[DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* [DONE] find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* [DONE] START LOOP: for each active tag link */
    for(let link of activeLinks){
      /* [DONE] remove class active */
      link.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
  }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* [DONE] START LOOP: for each found tag link */
    for(let tag of tagLinks){
      /* [DONE] add class active */
      tag.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  function addClickListenersToTags(){
    /* [DONE] find all links to tags */
    const allLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* [DONE] START LOOP: for each link */
    for(let link of allLinks){
      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* [DONE] END LOOP: for each link */
    }
  }

  addClickListenersToTags();


  function generateAuthors(){
      /* [NEW] create a new variable allAuthors with an empty object */
      let allAuthors = {};
      /* [DONE] find all articles */
      const articles = document.querySelectorAll(opt.article.Selector);
      /* [DONE] START LOOP: for every article: */
      for(let author of articles){
        /* [DONE] find authors wrapper */
        const wrapperAuthors = author.querySelector(optArticleAuthorsSelector);
        /* [DONE] make html variable with empty string */
        let html = '';
        /* [DONE] get authors from data-author attribute */
        const authorsName = author.getAttribute('data-author');
        /* [DONE] generate HTML of the link */
        const linkHTMLData = { id: authorsName, title: authorsName };
        const linkHTML = templates.authorLink(linkHTMLData);
        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allAuthors */
        if (!allAuthors[authorsName]) {
         /* [NEW] add tag to allAuthors object */
         allAuthors[authorsName] = 1;
        } else {
         allAuthors[authorsName]++;
        }
        /* [DONE] insert HTML of all the links into the authors wrapper */
        wrapperAuthors.insertAdjacentHTML('beforeend', html);
     /* [DONE] END LOOP: for every article: */
     }
     /* [NEW] find list of authors in right column */
     const authorList = document.querySelector('.authors');

     const authorsParams = calculateTagsParams(allAuthors);
     console.log('authorsParams:', authorsParams)
     /* [NEW] create variable for all links HTML code */
     const allAuthorsData = { authors: [] };
     /* [NEW] START LOOP: for each author in allAuthors: */
     for (let author in allAuthors) {
       /* [NEW] generate code of a link and add it to allAuthorsHTML */
       allAuthorsData.authors.push({
         author: author,
         count: allAuthors[author],
         className: calculateTagClass(allAuthors[author], authorsParams)
       });
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = templates.allAuthorsLink(allAuthorsData);
   }

   generateAuthors();

   function authorClickHandler(event){
     /* [DONE] prevent default action for this event */
     event.preventDefault();
     /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
     const clickedElement = this;
     /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
     const href = clickedElement.getAttribute('href');
     /* [DONE] make a new constant "author" and extract author from the "href" constant */
     const author = href.replace('#author-', '');
     /* [DONE] find all authors links with class active */
     const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
     /* [DONE] START LOOP: for each active author link */
     for(let link of activeAuthors){
       /* [DONE] remove class active */
       link.classList.remove('active');
     /* [DONE] END LOOP: for each active author link */
     }
      /* [DONE] execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenersToAuthors(){
      /* [DONE] find all links to authors */
      const allLinks = document.querySelectorAll('a[href^="#author-"]');

      /* [DONE] START LOOP: for each link */
      for(let link of allLinks){

        /* [DONE] add tagClickHandler as event listener for that link */
        link.addEventListener('click', authorClickHandler);

      /* [DONE] END LOOP: for each link */
      }
    }

    addClickListenersToAuthors();

}
