(() => {
  const normalize = value => String(value).trim().replace(/\s+/g, ' ').toLowerCase();

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  const MISSION_LENGTH = 20;

  function validateMission(api, grade, chapterIndex, conceptIndex, concept) {
    const questions = api.missionQuestionsFor(Number(grade), chapterIndex, conceptIndex);
    const missionName = `Grade ${grade}, chapter ${chapterIndex + 1}, ${concept}`;

    assert(questions.length === MISSION_LENGTH, `${missionName}: expected ${MISSION_LENGTH} questions, found ${questions.length}`);
    assert(new Set(questions.map(question => normalize(question.question))).size === MISSION_LENGTH, `${missionName}: repeated question text found`);

    const repeatCall = api.missionQuestionsFor(Number(grade), chapterIndex, conceptIndex);
    assert(JSON.stringify(repeatCall.map(q => q.question)) === JSON.stringify(questions.map(q => q.question)), `${missionName}: mission is not deterministic across repeated generation calls`);

    const levelCounts = { Easy: 0, Medium: 0, Hard: 0, Expert: 0 };
    for (const [questionIndex, question] of questions.entries()) {
      assert(question.question && question.correct, `${missionName}, question ${questionIndex + 1}: missing question or answer`);
      assert(Array.isArray(question.options) && question.options.length === 4, `${missionName}, question ${questionIndex + 1}: expected four choices`);
      assert(new Set(question.options.map(normalize)).size === 4, `${missionName}, question ${questionIndex + 1}: duplicate answer choices found`);
      assert(question.options.filter(option => normalize(option) === normalize(question.correct)).length === 1, `${missionName}, question ${questionIndex + 1}: correct answer must appear exactly once`);
      assert(['Easy', 'Medium', 'Hard', 'Expert'].includes(question.level), `${missionName}, question ${questionIndex + 1}: missing or invalid difficulty level`);
      levelCounts[question.level]++;
    }
    assert(Object.values(levelCounts).every(count => count === 5), `${missionName}: expected 5 questions per difficulty level, found ${JSON.stringify(levelCounts)}`);
  }

  window.runNumberQuestTests = api => {
    const results = [];
    const grades = Object.entries(api.course);

    for (const [grade, gradeContent] of grades) {
      for (const [chapterIndex, chapter] of gradeContent.chapters.entries()) {
        for (const [conceptIndex, concept] of chapter[1].entries()) {
          assert(api.conceptLessons[concept], `Grade ${grade}, chapter ${chapterIndex + 1}: missing lesson for ${concept}`);
          assert(api.conceptCases[concept], `Grade ${grade}, chapter ${chapterIndex + 1}: missing cases for ${concept}`);
          assert(api.conceptCases[concept].length >= 2, `Grade ${grade}, chapter ${chapterIndex + 1}: ${concept} needs at least two cases`);
          const hasVisual = concept === 'Place value' || api.conceptVisualMap[concept];
          assert(hasVisual, `Grade ${grade}, chapter ${chapterIndex + 1}: missing visual for ${concept}`);
          validateMission(api, grade, chapterIndex, conceptIndex, concept);
          results.push(`PASS Grade ${grade} / Chapter ${chapterIndex + 1} / ${concept}`);
        }
      }
    }

    const rounding = api.missionQuestionsFor(4, 0, 1);
    assert(rounding.every(question => /^Round |^Which number rounds/.test(question.question)), 'Rounding mission contains non-rounding prompts');

    const allQuestionTexts = [];
    for (const [grade, gradeContent] of grades) {
      for (const [chapterIndex, chapter] of gradeContent.chapters.entries()) {
        for (const conceptIndex of chapter[1].keys()) {
          const questions = api.missionQuestionsFor(Number(grade), chapterIndex, conceptIndex);
          allQuestionTexts.push(...questions.map(q => `${grade}-${chapterIndex}-${conceptIndex}-${normalize(q.question)}`));
        }
      }
    }
    assert(new Set(allQuestionTexts).size === allQuestionTexts.length, 'Duplicate question text found within a single mission across the full content set');

    for (const [readingGrade, minWords, maxWords] of [[4, 300, 350], [5, 750, 1050]]) {
      const readingChapters = api.readingCourse[readingGrade].chapters;
      assert(readingChapters.length === 4, `Grade ${readingGrade} Reading: expected four themed collections, found ${readingChapters.length}`);
      if (readingGrade === 4) {
        assert(readingChapters[2][0] === 'Great Business Builders', 'Grade 4 Reading: third collection must be Great Business Builders');
        assert(!readingChapters.some(chapter => chapter[0] === 'General Knowledge Adventures'), 'Grade 4 Reading: old General Knowledge collection should not remain');
      } else {
        assert(readingChapters[0][0] === 'World-Changing Inventions', 'Grade 5 Reading: first collection must cover world-changing inventions');
        assert(readingChapters[1][0] === 'Presidents and American Change', 'Grade 5 Reading: second collection must cover presidents');
        assert(readingChapters[2][0] === 'American History in Motion', 'Grade 5 Reading: third collection must cover historical events');
        assert(readingChapters[3][0] === 'Business Ideas That Changed Daily Life', 'Grade 5 Reading: fourth collection must cover business builders');
      }
      const storyTitles = [], passages = [], readingQuestionTexts = [];
      for (const [chapterIndex, chapter] of readingChapters.entries()) {
        assert(chapter[1].length === 50, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}: expected 50 stories, found ${chapter[1].length}`);
        const visualKeys = [], visualArticles = [];
        for (const [storyIndex, story] of chapter[1].entries()) {
          assert(story.title && story.passage, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: missing title or passage`);
          assert(story.questions.length === 5, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: expected five questions`);
          const visual = api.readingVisualFor(story, chapter[0]);
          assert(visual.label && Number.isInteger(visual.key) && visual.fallback.startsWith('data:image/svg+xml,'), `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: image lacks a stable unique key or fallback`);
          assert(!JSON.stringify(visual).toLowerCase().includes('loremflickr'), `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: still uses unreliable keyword image search`);
          if (chapter[0] === 'Business Ideas That Changed Daily Life') assert(visual.kind === 'company' && visual.article, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: company story lacks a logo lookup`);
          else if (chapter[0] === 'Great Business Builders') assert(visual.kind === 'generic' && !visual.article, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: fictional business should not fetch a real image`);
          else assert(visual.article, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: named subject lacks an image article`);
          visualKeys.push(visual.key);
          if (visual.article) visualArticles.push(visual.article.toLowerCase());
          const wordCount = story.passage.trim().split(/\s+/).length;
          assert(wordCount >= minWords && wordCount <= maxWords, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: expected ${minWords}–${maxWords} words, found ${wordCount}`);
          storyTitles.push(normalize(story.title));
          passages.push(normalize(story.passage));
          const questions = api.readingQuestionsFor(readingGrade, chapterIndex, storyIndex);
          assert(questions.length === 5, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}: generator did not return five questions`);
        for (const [questionIndex, question] of questions.entries()) {
          assert(question.options.length === 4, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}, question ${questionIndex + 1}: expected four choices`);
          assert(new Set(question.options.map(normalize)).size === 4, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}, question ${questionIndex + 1}: duplicate choices found`);
          assert(question.options.filter(option => normalize(option) === normalize(question.correct)).length === 1, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}, story ${storyIndex + 1}, question ${questionIndex + 1}: correct answer must appear exactly once`);
          readingQuestionTexts.push(`${story.id}-${normalize(question.question)}`);
        }
      }
        assert(new Set(visualKeys).size === 50, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}: repeated visual keys found`);
        assert(new Set(visualArticles).size === visualArticles.length, `Grade ${readingGrade} Reading chapter ${chapterIndex + 1}: two stories resolve to the same image, which would render duplicates`);
      }
      assert(storyTitles.length === 200 && new Set(storyTitles).size === 200, `Grade ${readingGrade} Reading: expected 200 unique story titles`);
      assert(passages.length === 200 && new Set(passages).size === 200, `Grade ${readingGrade} Reading: expected 200 unique passages`);
      assert(readingQuestionTexts.length === 1000 && new Set(readingQuestionTexts).size === 1000, `Grade ${readingGrade} Reading: expected 1,000 unique comprehension questions`);
      results.push(`PASS Grade ${readingGrade} / Reading & Writing / 200 stories / 1,000 comprehension questions`);
    }
    const findStory = (grade, chapterIndex, prefix) => api.readingCourse[grade].chapters[chapterIndex][1].find(story => story.title.startsWith(prefix));
    const articleOf = (grade, chapterIndex, prefix) => api.readingVisualFor(findStory(grade, chapterIndex, prefix), api.readingCourse[grade].chapters[chapterIndex][0]);
    assert(articleOf(5, 0, 'The Plow').article === 'Plough', 'Reading visuals: the Plow story must map to the Plough article, not a random image');
    assert(articleOf(5, 0, 'The Bicycle').article === 'Bicycle', 'Reading visuals: the Bicycle story must map to the Bicycle article, not a house');
    assert(articleOf(5, 2, 'The Declaration of Independence').article === 'Flag of the United States', 'Reading visuals: the Declaration story must map to the US flag');
    assert(articleOf(5, 2, 'The U.S. Constitution').article === 'White House', 'Reading visuals: the Constitution story must map to the White House');
    const apple = articleOf(5, 3, 'Apple');
    assert(apple.kind === 'company' && apple.article === 'Apple Inc.', 'Reading visuals: the Apple story must resolve to the Apple company for its logo');
    results.push('PASS Reading & Writing / curated per-subject image mapping without repeats');

    const socialExpectations = {
      4: ['Exploring the United States', 'The Northeast Region', 'The Southeast Region', 'The Midwest Region', 'The Southwest Region', 'The West Region', 'Citizen Rights and Government Functions'],
      5: ['Our Land and First People', 'Age of Exploration and Settlement', 'The English Colonies', 'The American Revolution', 'Building a New Nation', 'Westward Expansion', 'A Nation Divided', 'Modern America and the Question of Equality']
    };
    for (const [socialGrade, expectedTitles] of Object.entries(socialExpectations)) {
      const chapters = api.socialCourse[socialGrade].chapters;
      assert(chapters.length === expectedTitles.length, `Grade ${socialGrade} Social Studies: expected ${expectedTitles.length} chapters, found ${chapters.length}`);
      assert(JSON.stringify(chapters.map(chapter => chapter[0])) === JSON.stringify(expectedTitles), `Grade ${socialGrade} Social Studies: chapter titles do not match curriculum scope`);
      for (const [chapterIndex, chapter] of chapters.entries()) {
        const facts = chapter[3];
        assert(facts.length === 10, `Grade ${socialGrade} Social Studies chapter ${chapterIndex + 1}: expected ten detailed facts`);
        const questions = api.socialQuestionsFor(Number(socialGrade), chapterIndex);
        assert(questions.length === 20, `Grade ${socialGrade} Social Studies chapter ${chapterIndex + 1}: expected 20 questions`);
        assert(new Set(questions.map(question => normalize(question.question))).size === 20, `Grade ${socialGrade} Social Studies chapter ${chapterIndex + 1}: repeated questions found`);
        for (const [questionIndex, question] of questions.entries()) {
          assert(question.options.length === 4, `Grade ${socialGrade} Social Studies chapter ${chapterIndex + 1}, question ${questionIndex + 1}: expected four choices`);
          assert(new Set(question.options.map(normalize)).size === 4, `Grade ${socialGrade} Social Studies chapter ${chapterIndex + 1}, question ${questionIndex + 1}: duplicate choices found`);
          assert(question.options.filter(option => normalize(option) === normalize(question.correct)).length === 1, `Grade ${socialGrade} Social Studies chapter ${chapterIndex + 1}, question ${questionIndex + 1}: correct answer must appear exactly once`);
        }
        results.push(`PASS Grade ${socialGrade} / Social Studies / Chapter ${chapterIndex + 1} / 10 facts / 20 questions`);
      }
    }

    return { passed: results.length, results };
  };

  window.runNumberQuestUiFlowTest = async frame => {
    const document = frame.contentDocument;
    const api = frame.contentWindow.NumberQuestTestAPI;
    const clickAnswer = answer => {
      const button = [...document.querySelectorAll('[data-answer]')].find(item => normalize(item.textContent) === normalize(answer));
      assert(button, `UI flow: answer choice ${answer} was not rendered`);
      button.click();
    };
    const completeMission = async mission => {
      for (let index = 0; index < mission.length; index++) {
        clickAnswer(mission[index].correct);
        if (index < mission.length - 1) document.querySelector('#nextQuestion').click();
      }
      await new Promise(resolve => setTimeout(resolve, 750));
    };
    document.querySelector('[data-chapter="0"]').click();
    document.querySelector('[data-start-concept="0"]').click();
    const mission = api.missionQuestionsFor(4, 0, 0);
    assert(document.querySelector('[data-answer]'), 'UI flow: direct answer choices were not rendered');
    clickAnswer(mission[0].correct);
    assert(document.querySelector('.cheer'), 'UI flow: correct answer did not show a celebration');
    assert([...document.querySelectorAll('[data-answer]')].every(button => button.disabled), 'UI flow: answer buttons were not locked after a correct answer');

    document.querySelector('#backToConcepts').click();
    document.querySelector('[data-start-concept="1"]').click();
    const rounding = api.missionQuestionsFor(4, 0, 1);
    await completeMission(rounding);
    assert(document.querySelector('.marks-card')?.textContent.includes('20 / 20'), 'UI flow: completed section did not show a 20 / 20 mark');
    assert(document.querySelector('#nextSection')?.textContent.includes('Add & subtract'), 'UI flow: completed section did not offer the next section');
    document.querySelector('#backToConcepts').click();
    assert(document.querySelector('[data-start-concept="1"]').textContent.includes('Diamond coin earned'), 'UI flow: completed section was not marked with its earned coin');
    assert(document.querySelector('[data-start-concept="1"]').textContent.includes('◆'), 'UI flow: completed section did not show its earned coin symbol');
    const rewards = JSON.parse(frame.contentWindow.localStorage.getItem('numberQuestSectionRewards') || '{}');
    assert(rewards['math-4-0-1'] === 'Diamond', 'UI flow: section coin was not persisted by its section key');
    document.querySelector('[data-start-concept="0"]').click();
    await completeMission(api.missionQuestionsFor(4, 0, 0));
    document.querySelector('#backToConcepts').click();
    document.querySelector('[data-start-concept="2"]').click();
    await completeMission(api.missionQuestionsFor(4, 0, 2));
    document.querySelector('#backToConcepts').click();
    document.querySelector('[data-chapter="0"]').click();
    assert(document.querySelector('[data-chapter="0"]').textContent.includes('◆'), 'UI flow: fully completed chapter did not show its derived chapter coin');
    document.querySelector('#openRewards').click();
    assert(document.querySelectorAll('[data-reward-tier]').length === 4, 'UI flow: trophy cabinet did not render four reward coins');
    assert(document.querySelector('.learning-fund strong')?.textContent.startsWith('$'), 'UI flow: trophy cabinet did not show a dynamic fund total');
    document.querySelector('[data-reward-tier="Diamond"]').click();
    assert(/\$\d+/.test(document.querySelector('#rewardMessage').textContent), 'UI flow: reward coin did not show its dollar contribution');
    document.querySelector('#closeRewards').click();
    document.querySelector('[data-subject="ela"]').click();
    assert(document.querySelectorAll('[data-chapter]').length === 4, 'UI flow: Grade 4 Reading & Writing did not show four themed collections');
    document.querySelector('[data-chapter="0"]').click();
    assert(document.querySelectorAll('[data-start-concept]').length === 50, 'UI flow: reading collection did not show 50 stories');
    const thumbnails = [...document.querySelectorAll('.story-thumbnail img')];
    assert(thumbnails.length === 50, 'UI flow: reading collection did not render a thumbnail for every story');
    assert(new Set(thumbnails.map(image => image.dataset.imageKey)).size === 50, 'UI flow: reading collection repeated thumbnail image keys');
    assert(thumbnails.every(image => image.dataset.imageStatus === 'fallback' && image.src.startsWith('data:image/svg+xml,')), 'UI flow: reading collection did not render immediate visual fallbacks');
    api.forceReadingImageLoad();
    await new Promise(resolve => setTimeout(resolve, 9000));
    const rendered = [...document.querySelectorAll('.story-thumbnail img')];
    assert(rendered.every(image => image.complete && image.naturalWidth > 0), 'UI flow: a reading thumbnail rendered blank or broken');
    assert(new Set(rendered.map(image => image.currentSrc || image.src)).size === 50, 'UI flow: reading thumbnails rendered duplicate images');
    assert(rendered.filter(image => image.dataset.imageStatus === 'loaded').length >= 3, 'UI flow: reading thumbnails never loaded any real topic images');
    document.querySelector('[data-start-concept="0"]').click();
    assert(document.querySelector('.reading-passage'), 'UI flow: reading story passage was not rendered');
    const featuredImage = document.querySelector('.reading-hero-image img');
    assert(featuredImage, 'UI flow: reading story did not render its featured picture');
    await new Promise(resolve => setTimeout(resolve, 3000));
    assert(featuredImage.complete && featuredImage.naturalWidth > 0, 'UI flow: reading story featured image is blank or broken');
    assert(featuredImage.dataset.imageStatus === 'loaded' && /upload\.wikimedia\.org/.test(featuredImage.currentSrc || featuredImage.src), 'UI flow: invention featured image did not load a real Wikipedia photo');
    assert(document.querySelectorAll('[data-answer]').length === 4, 'UI flow: reading comprehension question did not show four choices');
    assert(document.querySelector('.question-meta').textContent.includes('of 5'), 'UI flow: reading story did not use five comprehension questions');
    document.querySelector('[data-grade="5"]').click();
    document.querySelector('[data-subject="ela"]').click();
    assert(document.querySelectorAll('[data-chapter]').length === 4, 'UI flow: Grade 5 Reading & Writing did not show four themed collections');
    assert(document.querySelector('[data-chapter="0"]').textContent.includes('World-Changing Inventions'), 'UI flow: Grade 5 inventions collection was not shown');
    document.querySelector('[data-chapter="1"]').click();
    document.querySelector('[data-start-concept="0"]').click();
    const presidentImage = document.querySelector('.reading-hero-image img');
    await new Promise(resolve => setTimeout(resolve, 3000));
    assert(presidentImage.dataset.imageStatus === 'loaded' && /upload\.wikimedia\.org/.test(presidentImage.currentSrc || presidentImage.src), 'UI flow: president story did not load a real portrait');
    document.querySelector('#backToConcepts').click();
    document.querySelector('[data-chapter="3"]').click();
    assert(document.querySelectorAll('[data-start-concept]').length === 50, 'UI flow: Grade 5 business collection did not show 50 stories');
    document.querySelector('[data-start-concept="0"]').click();
    const businessImage = document.querySelector('.reading-hero-image img');
    await new Promise(resolve => setTimeout(resolve, 5000));
    assert(businessImage.dataset.imageStatus === 'loaded' && businessImage.classList.contains('is-logo'), 'UI flow: named business story did not load its company logo');
    const words = document.querySelector('.reading-passage').textContent.trim().split(/\s+/).length;
    assert(words >= 750 && words <= 1050, `UI flow: Grade 5 passage should be 750–1050 words, found ${words}`);
    assert(document.querySelector('.question-meta').textContent.includes('of 5'), 'UI flow: Grade 5 story did not use five comprehension questions');
    document.querySelector('[data-grade="4"]').click();
    document.querySelector('[data-subject="social"]').click();
    assert(document.querySelectorAll('[data-chapter]').length === 7, 'UI flow: Grade 4 Social Studies did not show seven chapters');
    document.querySelector('[data-chapter="0"]').click();
    document.querySelector('[data-start-concept="0"]').click();
    assert(document.querySelectorAll('.social-facts section').length === 10, 'UI flow: Social Studies lesson did not render ten detailed concepts');
    assert(document.querySelector('.question-meta').textContent.includes('of 20'), 'UI flow: Social Studies chapter did not use twenty questions');
    assert(document.querySelectorAll('[data-answer]').length === 4, 'UI flow: Social Studies question did not show four choices');
    return 'PASS shared UI flow: math coins, reading libraries, and Grade 4 Social Studies lesson flow';
  };
})();
