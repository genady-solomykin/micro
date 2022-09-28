$.ajax({
  url: 'https://run.mocky.io/v3/cb0ea131-a0b0-4ba7-9749-4d41a3afcc4f',
  method: 'get',
  dataType: 'json',
  success: function(response) { 
    if(response?.items) {
      const storiesOptions = [];
      
      response.items.forEach((story) => {
        const readyStory = {
          id: story.story_id,
          name: story.name,
          enable: story.enable,
          photo: story.thumbnail,
          items: [],
        };
        
        readyStory.items = story.contents.map((item) => ({
          id: item.content_id,
          type: item.type,
          url: item.content_path,
          prod: item.link,
          goods: item.products?.constructor == Object ? Object.values(item.products) : []
        }));

        storiesOptions.push(readyStory);
      });
      
      stroriesAjaxResponse(storiesOptions);
    }
  }
});


function stroriesAjaxResponse(stories) {
  new StoriesSlider(document.getElementById("app-stories"), { stories });
}



