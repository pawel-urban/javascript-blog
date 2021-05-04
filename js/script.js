'use strict';
{
  /*
  document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
  });
  */
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
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /*[DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

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

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

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
      const linkHTML = '<li><a href="#tag-' + articleTags + '"<span>' + tag + '</span></a></li>';

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
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
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for(let tagLink of tagLinks){

    /* [DONE] remove class active */
    tagLink.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
}
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagHrefs = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for(let tagHref of tagHrefs){

    /* [DONE] add class active */
    tagHref.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
}
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const tagHrefs = document.querySelectorAll('a[href^="tag-"]');

  /* [DONE] START LOOP: for each link */
  for(let tagHref of tagHrefs){
    /* [DONE] add tagClickHandler as event listener for that link */
    tagHref.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
     /* [DONE] find all articles */
     const articles = document.querySelectorAll(optArticleSelector);

     /* [DONE] START LOOP: for every article: */
     for(let article of articles){

       /* [DONE] find authors wrapper */
       const authorsWrapper = article.querySelector(optArticleAuthorSelector);

       /* [DONE] make html variable with empty string */
       let html = '';

       /* [DONE] get authors from data-author attribute */
       const articleAuthors = article.getAttribute('data-author');

       /* [DONE] generate HTML of the link */
         const linkHTML = '<li><a href="#author-' + articleAuthors + '"<span>' + author + '</span></a></li>';

         /* [DONE] add generated code to html variable */
         html = html + linkHTML;

       /* [DONE] insert HTML of all the links into the authors wrapper */
       authorsWrapper.innerHTML = html;

     /* [DONE] END LOOP: for every article: */
     }
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
     const author = href.replace('#author-', ' ');

     /* [DONE] find all authors links with class active */
     const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

     /* [DONE] START LOOP: for each active tag link */
     for(let authorLink of authorsLinks){

       /* [DONE] remove class active */
       authorLink.classList.remove('active');

     /* [DONE] END LOOP: for each active tag link */
     }

     /* [DONE] find all author links with "href" attribute equal to the "href" constant */
     const authorHrefs = document.querySelectorAll('a[href^="#author-' + author + '"]');

     /* [DONE] START LOOP: for each found tag link */
     for(let authorHref of authorHrefs){

       /* [DONE] add class active */
       authorHref.classList.add('active');

     /* [DONE] END LOOP: for each found tag link */
     }

     /* [DONE] execute function "generateTitleLinks" with article selector as argument */
     generateTitleLinks('data-author="' + author + '"]');
   }
