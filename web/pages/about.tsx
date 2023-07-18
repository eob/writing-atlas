import Head from '../components/utility/site/Head'
import Layout from '../components/layout'
import Header from '../components/utility/site/Header'
import React from 'react'

/**
 * @brief Headshot of person
 *
 * @param name [String] name of person
 * @param photo [String] path to image in /web/public folder, if null, return null
 * @constructor
 */
function PersonImage({name, photo=null}) {
  if (photo) {
    return (
       <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
          <img className="object-cover shadow-lg rounded-lg " src={photo} alt={`Photo of ${name}`} />
       </div>
    );
  }
  return null;
}

/**
 * @brief Person component
 *
 * @param name [String] name of person
 * @param title [String] title for person, e.g., "CEO", can be null for no title
 * @param photo [String] path to image in /web/public folder, can be null for no photo
 * @param children [String] bio text
 * @constructor
 */
export function Person({name, title=null, photo=null, children}) {
  return (
    <li>
      <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
        <PersonImage name={name} photo={photo} />
        <div className={photo ? "sm:col-span-2" : "sm:col-span-3"}>
          <div className="space-y-4">
            <div className="text-lg leading-6 font-medium space-y-1">
              <h3>{name}</h3>
              <p className="text-indigo-600">{title}</p>
            </div>
            <div className="text-lg">
              <p className="text-gray-500">{children}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

/**
 * List of people on the executive team
 *
 * @constructor
 */
function ExecutiveTeam() {
  return (
      <div>
        <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
          <Person name="Ted Benson" photo="/images/about/ted-benson.jpg">
          Ted runs <a className="colored" href="https://www.heavyfoundry.com">Heavy Foundry</a>, an AI production studio that partners on early stage products &amp; prototypes.
          He has a PhD from MIT and previously led the Machine Intelligence group at <a className="colored" href="https://www.instabase.com/">Instabase</a> after the company acquired his startup.
          Ted dreams of one day writing cheesy thriller novels to keep you up at night. He and his family recently moved to Taiwan 🇹🇼 so his son could attend school in a normal environment during the pandemic.
          </Person>
          <Person name="Jennifer 8. Lee" photo="/images/about/jennifer-lee.jpg">
          Jenny is CEO of <a className="colored" href="https://www.plympton.com/">Plympton</a>, a literary studio that does innovative projects in digits publishing, including this one!
          She produces documentaries, including <a className="colored" href="http://www.thesearchforgeneraltso.com/">The Search for General Tso</a> and The Emoji Story 🥡.
          She’s also an emoji activist, whose work in this front with Emojination has been collected by the Smithsonian and honored by Fast Company.
          Once upon a time she was a reporter for The New York Times and authored a book called The Fortune Cookie Chronicles, which was her first exposure to the publishing industry.
          </Person>
          <Person name="Shirley Wang" photo="/images/about/shirley-wang.jpg">
          Shirley is an assistant editor for Plympton.
          Her story <a className="colored" href="https://www.wbur.org/onlyagame/2018/12/14/lin-wang-charles-barkley">“My Dad’s Friendship with Charles Barkley”</a> was a notable selection in The Best American Sports Writing of 2019.
          Shirley recently moved to Melbourne, Australia 🇦🇺 for love ❤️.
          </Person>
          <Person name="Eric Zhou" photo="/images/about/eric-zhou.jpg">
          Eric is data 📊 steward for Plympton and Writing Atlas.
          If a story is in the system, there's a 95% chance Eric got it there.
          Eric is a software engineer at Facebook (Meta). He dreams of being Librarian of Congress 🏛 one day.
          </Person>
          <Person name="Kiara Gomez" photo="/images/about/kiara-gomez.jpeg">
          Kiara is an assistant editor for Plympton. At Harvard, she studied Social Anthropology and Government. She loves speculative fiction and is currently working on a novel.
          </Person>
          <Person name="Quentin Humphrey" photo="/images/about/quentin-humphrey.jpg">              
          Quentin is currently a computer science major at Lafayette College (roll pards 🐆). He enjoys the national 
          parks, hiking, rock climbing, and yummy desserts. 
          </Person>
        </ul>
      </div>
  )
}

/**
 * @brief List all fellows from summer 2022
 *
 * @constructor
 */
function FellowsSummer2022() {
  return (
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">2022 Fellows</h2>
        <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
          <Person name="Estevan Samayoa" photo="/images/about/estevan-samayoa.jpeg">
            Estevan is attending Emory University, studying creative writing and sociology.
            He has a passion for community organizing and social justice, and hopes to live a well-rounded
            life that includes both his love of literature as well as his dedication to helping other humans.
          </Person>
          <Person name="Madi Adkins" photo="/images/about/madi-adkins.jpg">
            Madi Adkins is a junior at Emory University, pursuing a BA in English with a minor in Art History.
            She is passionate about mental health advocacy, loves true crime and plant-based cooking.
          </Person>
          <Person name="Zone Li" photo="/images/about/zone-li.jpeg">
            I am a senior at Emory. I major in data science with a focus in neuroscience and behavioral biology.
            I was born in Hongkong. I love the Harry Potter books.
          </Person>
          <Person name="China Dennington" photo="/images/about/china-dennington.jpeg">
            China is a senior at Emory university studying English & history. Devoting herself to storytelling
            from a young age, she delights in consuming, learning about, and creating media. When writing her own fiction,
            she loves to infuse her settings with magic and mystery. She believes that fantasy can be an excellent
            framework for exploring how grief, love, and loss make us human.
          </Person>
          <Person name="Hannah Book" photo="/images/about/hannah-book.png">
            Hannah is a sophomore at Emory University where she is pursuing a double major in English and Political Science.
            In her spare time she tutors high school students, binge watches period pieces, and bakes brownies--Duncan Hines,
            of course! She aspires to one day know what she will do after college.
          </Person>
          <Person name="Emma Dollar" photo="/images/about/emma-dollar.jpeg">
            Emma Dollar is a junior at Emory University studying English & Creative Writing and International Studies.
            She loves backpacking, baking banana bread, and her dogs, and she is forever in search of the best soup
            dumplings in the world.
          </Person>
          <Person name="Sheena Holt" photo="/images/about/sheena-holt.jpeg">
            Sheena Holt is an undergrad creative writing student at Emory University. A writer of fiction and non-fiction,
            she is fascinated by stories of religion and place. She is currently trying out running, rock-climbing,
            and roller-skating to see about taking on one or more as a Hobby™️. She remains undecided as to the sports’ fates.
          </Person>
          <Person name="Megan Freeman" photo="/images/about/megan-freeman.jpeg">
            Megan Freeman is a senior at Emory University studying English and Environmental Science. She loves
            making overly specific playlists, writing about climate fiction, and constantly checking the weather forecast.
          </Person>
          <Person name="Grace Donahue" photo="/images/about/grace-donahue.jpeg">
            Grace is a senior at Emory University studying English and Environmental Science. Grace has lived in the U.K,
            Canada, Chile, and the U.S, but now calls Boulder, CO home. Their perfect Sunday morning includes an
            episode of The Writer's Voice and a cup of Trader Joe's coffee.
          </Person>
          <Person name="Amy Xia" photo="/images/about/amy-xia.jpeg">
            Amy is a Junior at Emory University studying English & Creative Writing and Psychology. She's a Boston native
            who loves Wong Kar-Wai movies and working on creative projects about mental health and AAPI identity.
            She will be your hype-woman and always know which songs to aux.
          </Person>
          <Person name="Chase Wolfsohn" photo="/images/about/chase-wolfsohn.jpeg">
            Chase is pursuing his B.A. in English Creative Writing and Religion at Emory University.
            He is interested in writing short stories, screenplays, and poetry. He has a passion for coffee, plants, and music.
          </Person>
          <Person name="Chloe Wegrzynowicz" photo="/images/about/chloe-wegrzynowicz.jpeg">
            Chloe Wegrzynowicz (she/her) is a junior at Emory University studying English & Creative Writing, with a
            minor in religion on the pre-medical track. She aspires to become a hybrid doctor-writer.
            She dreams of publishing a collection of poetry and authoring a cheesy romance novel and soap opera.
            Though her favorite genre is likely horror, she feels that soap operas and/or Telenovelas likely have
            some of the best story arcs. She lives in Pennsylvania with her family and cat, Sassy.
          </Person>
          <Person name="Dylan Malloy" photo="/images/about/dylan-malloy.png">
            Dylan is a rising sophomore double majoring in playwriting and business at Emory University
            (with a concentration in arts management within the business school). As an award-winning playwright,
            she has had multiple plays produced since March 2021 and looks forward to making her Los Angeles
            playwriting debut in August 2022, when one of her plays is set to be produced by The Blank
            Theatre in Hollywood through the company's Young Playwrights Festival.
            She is currently at work on her debut novel.
          </Person>
          <Person name="Eileen Hernandez" photo="/images/about/eileen-hernandez.jpeg">
            Eileen Hernandez is an undergraduate student at Emory University pursuing a B.A. in English.
            She is passionate about diverse forms of storytelling. After graduation, she plans to overcome
            her existential crisis, free sea animals from captivity, and bring One Direction back together.
          </Person>
          <Person name="Elizabeth Fulton" photo="/images/about/elizabeth-fulton.jpeg">
            Elizabeth is a sophomore at Oxford College of Emory University who plans to double major in
            Creative Writing and Film and Media Management. On campus, she is the president of the
            Oxford Film Club. Aside from the obvious hobbies associated with her academic interests,
            she enjoys listening to music and playing the piano. She is passionate about writing
            (and even more passionate about romantic comedies).
          </Person>
          <Person name="Ellie Purinton" photo="/images/about/ellie-purinton.jpeg">
            Ellie Purinton is a rising junior at Emory University, where she is an English and Creative Writing
            major and a Global Health minor. When she is not reading or writing, you can find Ellie scaring
            herself by watching true crime shows and horror movies at night.
          </Person>
          <Person name="Erin Li" photo="/images/about/erin-li.jpeg">
            Erin is currently a rising sophomore at Emory University’s Oxford campus. She is pursuing a
            double major in creative writing and biology and is a Writing Atlas intern at Plympton.
            Erin loves reading, writing, and drawing, but none of those things compare to how much she loves her dog Mango.
          </Person>
          <Person name="Hannah Chang" photo="/images/about/hannah-chang.jpeg">
            Hannah Chang is currently studying English and Psychology at Emory University. She spent two years
            at Oxford College getting her Associates Degree and exploring new interests in the literary
            world--her current favorites are works by Milton and Ishiguro. When she's not delving into
            Shakespearean plays, Hannah can be found writing poetry, learning a new instrument, or trying
            to recreate a recipe she found on Pinterest.
          </Person>
          <Person name="Lily Sayre" photo="/images/about/lily-sayre.jpeg">
            Lily Sayre is pursuing her BA in Creative Writing at Emory University. Her background as a freelance
            developmental manuscript editor, published author, and fiction writing instructor has led
            her to a love of stories both as works of creativity and recognizable, malleable structures.
            When she isn't lost in a book, she enjoys painting watercolors, dancing, and forcing her friends
            to eat her bizarre ramen creations.
          </Person>
          <Person name="Sarah Corasanti" photo="/images/about/sarah-corasanti.jpeg">
            Sarah Corasanti is a rising senior at Emory University, majoring in English. When she is not writing
            her vampires vs. ghosts novel or drawing her Greek Gods comic book, she enjoys hiking, playing tennis,
            watching crime shows, and cuddling with her dog, Goober.
          </Person>
          <Person name="Sarah Davis" photo="/images/about/sarah-davis.jpeg">
            Sarah Davis is a junior at Emory University, majoring in English and Politics, Philosophy, and Law.
            She is a managing editor at her college paper and has previously served as an editorial intern in several newsrooms.
          </Person>
          <Person name="Madeline Gordon" photo="/images/about/madeline-gordon.png">
            Born in the Red Hills of South Georgia and raised up on family mythologies and Deep South religion,
            Madeline Gordon has been a storyteller since birth. At Emory, Madeline studies Religion and Creative Writing,
            and seeks to create work that highlights the grit and beauty of the people and landscape they hail from.
          </Person>
          <Person name="Christopher Labaza" photo="/images/about/christopher-labaza.jpeg">
            Christopher Labaza is a junior from Emory University, where he studies creative writing and music.
            On campus, he is a satirist for the Emory Spoke, an editorial cartoonist for the Emory Wheel,
            and a musician with the Emory Wind Ensemble.
          </Person>
          <Person name="Grace Donahue" photo="/images/about/grace-donahue.jpeg">
            Grace is a senior at Emory University studying English and environmental science.
            When she's not in a canoe or on a farm, she loves hanging out with her three cats Fred, George, and Pepper.
          </Person>
          <Person name="Clara Bonnlander" photo="/images/about/clara-bonnlander.jpeg">
            Clara Bonnlander is a senior at Emory University, majoring in English and minoring in Linguistics,
            with interests in literary theory, language, and poetry writing. She is from Pensacola, Florida
            and currently lives in a tiny studio apartment in Atlanta, Georgia with her rescue cat Petey.
          </Person>
          <Person name="Sara Komatsu" photo="/images/about/sara-komatsu.jpg">
          Sara is a sophomore at Harvard studying English with a secondary in Film Studies.
          Besides being a bookworm, she’s a ballerina currently training in Philadelphia.
          Sara writes for the Harvard Crimson, which is how she met Jenny!
          She dreams of writing for television someday, and directing ballet films like Ezra Hurwitz.
          </Person>
        </ul>
      </div>
  )
}

/**
 * @brief List all fellows from summer 2021
 *
 * @constructor
 */
function FellowsSummer2021() {
  return (
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">2021 Fellows</h2>
            <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
              <Person name="Estevan Samayoa" photo="/images/about/estevan-samayoa.jpeg">
                Estevan is attending Emory University, studying creative writing and sociology.
                He has a passion for community organizing and social justice, and hopes to live a well-rounded
                life that includes both his love of literature as well as his dedication to helping other humans.
              </Person>
              <Person name="Grace Donahue" photo="/images/about/grace-donahue.jpeg">
                Grace is a senior at Emory University studying English and environmental science.
                When she's not in a canoe or on a farm, she loves hanging out with her three cats Fred, George, and Pepper.
              </Person>
              <Person name="Ananya Mohan" photo="/images/about/ananya-mohan.jpeg">
                Ananya (she / her) is an undergraduate at Emory University who is dreading the day she has to declare her
                major - but it's (probably) going to be something English or Classics related. In her free time,
                she enjoys writing and making Twitter bots.
              </Person>
              <Person name="Ben Thomas" photo="/images/about/ben-thomas.jpeg">
                Ben Thomas is a sophomore at Emory University, where he studies comparative literature and political
                science. He loves Tolstoy, conflict studies, rewatching The West Wing, and dipping breakfast foods in coffee.
              </Person>
              <Person name="Clara Bonnlander" photo="/images/about/clara-bonnlander.jpeg">
                Clara Bonnlander is a senior at Emory University, majoring in English and minoring in Linguistics,
                with interests in literary theory, language, and poetry writing. She is from Pensacola, Florida
                and currently lives in a tiny studio apartment in Atlanta, Georgia with her rescue cat Petey.
              </Person>
              <Person name="Noreen Ocampo" photo="/images/about/noreen-ocampo.jpeg">
                Noreen Ocampo is an undergraduate at Emory University, where she double majors in English and Film
                and Media Studies. Her poetry appears or is forthcoming in Taco Bell Quarterly, Hobart, and HAD,
                among others, and she is also a blog co-editor for COUNTERCLOCK. She's currently learning the electric guitar!
              </Person>
              <Person name="Julie Park" photo="/images/about/julie-park.jpeg">
                Julie Park is a senior majoring in English at Emory University. She has served as the editor-in-chief
                of the Emory Undergraduate Research Journal and the Emory Journal of Asian Studies.
              </Person>
              <Person name="Christopher Labaza" photo="/images/about/christopher-labaza.jpeg">
                Christopher Labaza is a junior from Emory University, where he studies creative writing and music.
                On campus, he is a satirist for the Emory Spoke, an editorial cartoonist for the Emory Wheel,
                and a musician with the Emory Wind Ensemble.
              </Person>
              <Person name="Sophia Bereaud" photo="/images/about/sophia-bereaud.png">
                Sophia is a Boston native studying Creative Writing and Anthropology at Emory University. She is a
                recipient of the Woodruff Dean's Achievement Scholarship, an avid poetry reader and writer, and a lover of the ocean.
              </Person>
              <Person name="Elizabeth Hsieh" photo="/images/about/elizabeth-hsieh.jpeg">
                Elizabeth is a junior at Emory University majoring in English. She enjoys reading a diverse range
                of literature and is always reading too many books at once.
              </Person>
              <Person name="Maggie Connolly" photo="/images/about/maggie-connolly.jpeg">
                Maggie Connolly is a recent graduate of Emory University, where she received her BA in English & Creative Writing
                and Spanish. During her senior year of undergrad, Maggie wrote a thesis which focused on feminist theories
                of embodiment and Irish poetry. Maggie plans to continue her education at Emory next academic year as a
                part of Laney Graduate School, where she will pursue her MA in English. Maggie's hobbies include hiking, reading,
                writing poetry, drinking boba and matcha, and staying as busy as possible!
              </Person>
              <Person name="RW Poole II" photo="/images/about/rw-poole-ii.jpeg">
                RW is a third year student at Emory University double majoring in Comparative Literature and African American Studies.
                RW enjoys reading, the Golden Girls, and community organizing.
              </Person>
              <Person name="Vince Orozco" photo="/images/about/vince-orozco.jpeg">
                Vince Golden Orozco is a rising sophomore at Emory University. He plans to major in English and minor in Philosophy.
                His main interests are reading (his favorite book is Moby-Dick), writing (poetry mainly), and watching movies
                (his top 3 are Easy Rider, Hot Fuzz, and Mulholland Drive). He loves the music of Charles Bradley and
                enjoys a nice cup of blueberry hibiscus tea.
              </Person>
              <Person name="Grady Trexler" photo="/images/about/grady-trexler.jpg">
              Grady Trexler is an undergraduate student at Princeton University studying linguistics and philosophy.
              He is from Midlothian, Virginia. He currently uses a purple and white toothbrush.
              </Person>
              <Person name="Malia Maxwell" photo="/images/about/malia-maxwell.png">
              Malia Maxwell is currently pursuing a B.A. in English with an Emphasis in Creative Writing from Stanford University.
              Born and raised in Seattle, WA, her top three favorite trees (in no particular order) are: Douglas firs, Alaskan  yellow cedars, and Western red cedars.
              </Person>
              <Person name="Jared Klegar" photo="/images/about/jared-klegar.jpg">
              Jared is a first-year at Stanford, where he is studying sociology, creative writing, and computer science.
              A former Broadway performer and an avid literature fan, he is passionate about all forms of storytelling.
              </Person>
              <Person name="Ngan Chiem" photo="/images/about/ngan-chiem.jpg">
              Ngan is a sophomore at Princeton University and an aspiring fantasy novelist.
              </Person>
              <Person name="Almog Aybar" photo="/images/about/almog-aybar.jpg">
              Almog is a recent graduate of Stanford University, where she majored in English and was involved in a cappella and theater.
              She is currently pursuing a Master’s degree in music business from Berklee College of Music.
              In her free time, she enjoys discussing great literature and making music in her home studio.
              </Person>
              <Person name="Truelian Lee" photo="/images/about/truelian-lee.png">
              One day in third grade, Truelian Lee borrowed 70 hefty books at once, the bags so heavy that she ended up using a shopping cart to wheel all the teetering stacks out.
              Through the years, she has carried her passion for literature with her, and she has fond memories of spending hours upon hours at her local library (pre-pandemic).
              Truelian is currently a pre-medical student at Harvard College pursuing a double major in Chemistry and English, and she is interested in exploring the medical humanities.
              </Person>

              <Person name="Jessica Seng" photo="/images/about/jessica-seng.jpg">
              Jessica Seng, daughter of former refugees, is a Cambodian American writer from Tucson, Arizona.
              She recently graduated with honors from Stanford University where she majored in Science, Technology, and Society and minored in creative writing.
              She was also a recipient of the Louis Sudler Prize and has received a scholarship to study under Meng Jin at The Ruby SF.
              Jessica currently works in Late Night Television and is also at work on her first novel.
              </Person>

              <Person name="Kendall McKinnon" photo="/images/about/kendall-mckinnon.jpg">
              Kendall McKinnon is a student at The Savannah College of Art and Design.
              She will graduate with her Writing BFA in the spring of 2021.
              She joined Plympton in May 2020 and has worked on projects such as Recovering the Classics and Writing Atlas.
              </Person>

              <Person name="Sara Komatsu" photo="/images/about/sara-komatsu.jpg">
              Sara is a sophomore at Harvard studying English with a secondary in Film Studies.
              Besides being a bookworm, she’s a ballerina currently training in Philadelphia.
              Sara writes for the Harvard Crimson, which is how she met Jenny!
              She dreams of writing for television someday, and directing ballet films like Ezra Hurwitz.
              </Person>

              <Person name="Annie Zheng" photo="/images/about/annie-zheng.jpg">
              Annie Zheng (she/her) is 22, freshly out of Stanford University, pretty lost, and is considering a graduate degree in ethnic studies or sociology.
              She loves singing and dancing. She hopes you are having a nice day.
              Her twitter is <a className="colored" href="https://www.twitter.com/mashmall0w515">@mashmall0w515</a> and her dog's Instagram is <a className="colored" href="https://www.instagram.com/sunny.the.shih.tzu/">@sunny.the.shih.tzu</a>.
              Give her a follow!
              </Person>

              <Person name="Tania Fordwalker" photo="/images/about/tania-fordwalker.jpg">
              Tania Fordwalker hails from a small island at the end of the world.
              Her prizewinning short fiction has been published in Beneath Ceaseless Skies, PodCastle, Andromeda Spaceways and Reckoning, and she holds a Diploma of Professional Writing &amp; Editing, a B Arts Honours in Creative Writing, with a PhD underway.
              Part of the Clarion West 20/22 'ghost year', she is looking forward to this bloody plague being knocked on the head so she can get out into the world again.
              </Person>

              <Person name="Kaitlyn Choe" photo="/images/about/kaitlyn-choe.jpg">
              Kaitlyn Choe (she/her) is a junior at Stanford majoring in Human Biology and minoring in Creative Writing.
              She's passionate about making stories accessible at all stages of the life cycle and is excited to be contributing to the Writing Atlas community!
              </Person>

              <Person name="Sawyer Lucas-Griffin" photo="/images/about/sawyer-lucas-griffin.jpg">
              Sawyer Lucas-Griffin grew up and currently lives in Wyoming, where she tries her best to avoid moose attacks.
              She is also an undergraduate at Stanford University studying Human Biology and creative writing.
              </Person>

              <Person name="Issay Matsumoto" photo="/images/about/issay-matsumoto.jpeg">
              Issay Matsumoto is an aspiring teacher currently based near Boston.
              He loves critical histories, Chinatowns, youth activism, and Asian dramas.
              </Person>

              <Person name="Angie Lee" photo="/images/about/angie-lee.jpeg">
              Angie Lee is a senior at Stanford University majoring in English and minoring in Human Biology.
              She loves to read, write, eat spicy tuna rolls, and admire other people’s dogs.
              </Person>

              <Person name="Marie Ungar" photo="/images/about/marie-ungar.jpg">
              Marie Ungar studies English at Harvard University, where she's served as the poetry editor of the Harvard Advocate and an arts writer for the Harvard Crimson.
              She's written for DigBoston and Charlottesville Tomorrow.
              She really likes string cheese. You can follow her on Twitter @mreeeungr.
              </Person>

              <Person name="Julie Plummer" photo="/images/about/julie-plummer.jpg">
              Julie Plummer is a recent graduate of Stanford University, where she majored in English with a psychology minor.
              She is currently pursuing an MFA in nonfiction creative writing from Pacific University.
              A California Bay Area native, Julie is equally in love with the Pacific coastline and the rugged Sierra Nevada ridge lines.
              </Person>

              <Person name="Veronica Ordway" photo="/images/about/veronica-ordway.png">
              Veronica Ordway is a graduate of Emerson College with a degree in Writing, Literature, and Publishing.
              Along with working for Plympton, she is a writer, editor, and performance artist.
              Her performance art has been exhibited in Boston and Los Angeles, and her fiction has been published in the United States and Europe.
              </Person>

              <Person name="Izzy Ampil" photo="/images/about/izzy-ampil.jpg">
              Izzy Ampil is a senior at Stanford University, where she studies literature and creative writing.
              She loves cows, stone fruit, running around barefoot, her rickety old car, and (for the most part) working on her novel.
              </Person>

              <Person name="Erin Stoodley" photo="/images/about/erin-stoodley.jpg">
              Erin Stoodley is an artist and poet currently residing in Chicago.
              She is also a recent graduate of Stanford University, where she studied English and creative writing.
              Her poetry has been nominated for a Pushcart Prize and can be found in The Adroit Journal and Vox Viola.
              When she is not reading, Erin enjoys crocheting, printmaking, and playing in the snow.
              </Person>

              <Person name="Maliya Ellis" photo="/images/about/maliya-ellis.jpg">
              Maliya Ellis is a sophomore at Harvard concentrating in English with a secondary in Energy &amp; Environment.
              On campus, she writes for Fifteen Minutes, the weekly magazine of the Crimson, and is passionate about telling stories.
              She hopes to someday become a magazine journalist or environmental lawyer.
              She also loves long distance running, choral music, green tea, and Pillowpets (pictured above).
              </Person>

              <Person name="Lauren Fadiman" photo="/images/about/lauren-fadiman.png">
                Lauren Fadiman is a senior at Harvard College where she studies Folklore &amp; Mythology and Studies of Women, Gender, &amp; Sexuality.
              </Person>

              <Person name="Caroline Tew" photo="/images/about/caroline-tew.jpg">
                Caroline Tew graduated from Harvard University in 2020, where she studied English and economics.
                She was books executive of the Harvard Crimson for two years and has interned at Harvard Review, Entertainment Weekly, and the Massie and McQuilkin Literary Agency.
                She will be attending the Columbia Publishing Course next year.
              </Person>

              <Person name="Vivian Wong" photo="/images/about/vivian-wong.jpg">
                Vivian Wong is a junior at the University of Pittsburgh majoring in English Literature and Economics with an interest in content strategy.
              </Person>

              <Person name="Sal Kang" photo="/images/about/sal-kang.jpg">
                Sal Kang is a professional sluggard and occasional writer who spends most of her free time sleeping and reading Anne Carson.
                She is studying lots of different things at Princeton University before she figures out what she really wants to do in life.
                She tweets at @nini_kang.
              </Person>

              <Person name="Christina MacIntosh" photo="/images/about/christina-macintosh.jpg">
                Christina MacIntosh is an off-cycle junior at Stanford majoring in English with a Creative Writing emphasis and minoring in Earth Systems.
                When she is not reading or surreptitiously recording eavesdropped conversations in her notes, she enjoys backpacking, running long distances, waking up too early to go on adventures, and other kinds of not-fun fun.
              </Person>
            </ul>
      </div>
  )
}

/**
 * @brief Route handler for writingatlas.com/about
 *
 * @constructor
 */
export default function About() {
  // Display a certain season's fellows
  const [season, setSeason] = React.useState("summer-2022");

  return (
    <Layout user={null} loading={false}>
      <Head title="About Writing Atlas" />
      <Header showBooks={false} showAuthor={false} showBook={false} />
      <div className="bg-white">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Writing Atlas</h2>
            <ExecutiveTeam />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl float-left mr-4">Literary Fellows</h2>
            <select value={season} onChange={evt => setSeason(evt.target.value)}>
              <option selected value="summer-2022">Summer 2022</option>
              <option value="summer-2021">Summer 2021</option>
            </select>
            { season === "summer-2022" ? <FellowsSummer2022 /> : null }
            { season === "summer-2021" ? <FellowsSummer2021 /> : null }
          </div>
        </div>
      </div>
    </Layout>
  )
}