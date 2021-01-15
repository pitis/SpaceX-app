## SpaceX api demo

I created this React App with Ionic so that I can take full advantage of the existing components (it also made it look good instantly on phone). I also decided to use TypeScript. A state manager was not needed for this.

For the first main requirement I made POST requests with axios to the /query endpoint which presented the fact that the API can send paginated results. In this case, there were only 128 results so I decided to show 32 items per page(so 4 pages total).

For the second requirement, I created an "infinite" scroller where after the user reaches the end of the page, new items are loaded. The information I decided to go with are:

- ImageUrl
- Name
- Date
- Success Status
  Unfortunately, the Ionic Component for "Infinite Scroller" is not compatible with React, so the animation with a loading circle is not present, but the functionality is there.
  In case there is no image to upload, a "no image" thumbnail appears.

For the third requirement I created a name filter (searchBox) and a LaunchStatus filter. They can be used at the same time.

I only made 1 test for the "Launches" component.
