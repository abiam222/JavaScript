/*these are commands you can write in the console log

//performance

//metrics about user timing
//performance.mark('playback-start') 


/*
Synthetic Versus RUM (real user monitoring)

Web performance tools tend to be divided based on which big question they answer: 
“How fast is it?” or “How can it be made faster?” The two classifications of tools are 
commonly referred to as synthetic and real-user monitoring (RUM). WebPageTest falls under
 the synthetic category.


 Synthetic: Laboratory-like testing, Low variability, Ad hoc test
 RUM: Measures performance of real users, high variability, unrestricted, continuous data collection

 To help illustrate this pitfall, imagine that you run a synthetic test of your home page and 
 come to find that the load time is 10 seconds. “That’s crazy,” you think, because it never 
 feels that slow to you. Your real-world experience does not coincide with the test results. 
 It’s not that the test is necessarily wrong. The test configuration is meant to represent one
  particular use case. If it isn’t set up to match your browser, in your city, over your 
  connection speed, you’re unlikely to get comparable results. The test is only an artificial
   representation of what someone under similar conditions might experience. It’s up to you to
    configure the test in a way that mimics the conditions that you want to compare.

**It matters more of the UX and the time they want than what you think is "right" 

One WebPageTest best practice is to run tests multiple times and choose the most representative run to look at.
Since there can be anomolies
The method for choosing the most representative test run is to sort all runs by some metric and choose the middle-most run. 
By definition, this is referred to as the median run. The default median metric is the document complete time or load time.

**But updated webpageTest does run it 3 times.

Recall from geometry that the slope of a line in a coordinate system is its height 
divided by its length, or “rise over run.” In a waterfall diagram, things are a little 
different. The top-left point is the origin (or zero value), so increasing requests actually 
go downward. Still, we can apply the concept of slope to waterfalls in order to better 
understand them.

An example of a long series of requests in a waterfall with tall slope. These are mostly images loading over five domain shards. The vertical slope is an indicator of efficient use of the network.
To recap, the waterfall diagram is a visualization of the network traffic while a given page loads. This view is great for spotting most performance anti-patterns related to the critical path.
 WebPageTest provides an alternate view, called the connection view, focused not on the sequence of requests but rather the connections through which requests are made (Figure 2-15). 
 This type of view lends itself to better illustrating how the networking between server and browser works.

*/