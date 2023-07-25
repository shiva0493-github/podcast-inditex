import {getPodcasts, podcastDetail } from "./index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { listMock } from './MockData'
import {mockDetail, mockFeed} from './MockData2'



describe('Getting the Podcast Feed', () => {
    let mockAdapter;
  
    beforeEach(() => {
      // Create a new instance of MockAdapter for each test
      mockAdapter = new MockAdapter(axios);
    });
  
    afterEach(() => {
      // Reset the MockAdapter after each test
      mockAdapter.reset();
    });

    test('Podcasts Successfully received', async () => {
        // Given
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.setItem = jest.fn();

        let current = new Date().toLocaleString({timeZone:"Europe/Madrid"}).substring(0, 10)

        mockAdapter.onGet(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`).reply(200, listMock)
        expect.assertions(4)

        // When
        const data = await getPodcasts()
        // Expect
        expect(data.length).toBe(100)
        expect(data).toStrictEqual(listMock.feed.entry)
        expect(localStorage.setItem).toHaveBeenCalledWith('Podcasts', JSON.stringify(listMock.feed.entry))
        expect(localStorage.setItem).toHaveBeenCalledWith('DateAPI', JSON.stringify(current))
        
    })

});



// Second test

describe('Getting the Podcast Detail', () => {
    let mockAdapter;
  
    beforeEach(() => {
      // Create a new instance of MockAdapter for each test
      mockAdapter = new MockAdapter(axios);
    });
  
    afterEach(() => {
      // Reset the MockAdapter after each test
      mockAdapter.reset();
    });

    test('Podcasts Successfully received', async () => {
        // Given
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.setItem = jest.fn();

        let current = new Date().toLocaleString({timeZone:"Europe/Madrid"}).substring(0, 10)

        mockAdapter.onGet(`https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id=1676314916`).reply(200, mockDetail)
        mockAdapter.onGet(`https://cors-anywhere.herokuapp.com/https://feeds.simplecast.com/WVLa5QoG`).reply(200, mockFeed)
        expect.assertions(5)

        // Function to get content of description
        let x = mockFeed.search("<description>");
        let y = mockFeed.search("</description>");
        

        // When
        const data = await podcastDetail('1676314916')
      
        // Expect
        expect(data[0][0].podcast).toStrictEqual(mockDetail.results[0])
        expect(data[0][1].summary).toBe(mockFeed.substring(x + 13, y))
        expect(localStorage.setItem).toHaveBeenCalledWith('1676314916', JSON.stringify(data[0]))
        expect(localStorage.setItem).toHaveBeenCalledWith('list1676314916', JSON.stringify(data[1]))
        expect(localStorage.setItem).toHaveBeenCalledWith('DateAPI', JSON.stringify(current))        
    })

});



