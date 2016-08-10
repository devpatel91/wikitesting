var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
var chai = require('chai');
var spy = require('chai-spies');
var expect = chai.expect;
chai.use(spy);
var models = require('../models');
var Page = models.Page;
var page;

beforeEach(function(done){
	Page.create({
		title: "Fullstack Testing",
		content: "Here, we are trying to learn Testing",
		status: "open",

		tags: 'programming,coding,javascript'
	})
	.then(function(result){
		page = result;
		done();
	})
	

})
describe('Page model', function () {

  describe('Virtuals', function () {
    describe('route', function () {

      it('returns the url_name prepended by "/wiki/"', function(){
      	console.log("!!!!!" + page.route)
      	expect(page.route.slice(0,6)).to.be.equal("/wiki/");
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML',function(){
          expect(page.renderedContent).to.be.equal("<p>"+ page.content + "</p>\n");
      });

    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      xit('gets pages with the search tag');
      xit('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});



/* OUTLINE
describe('Page model', function () {

  describe('Virtuals', function () {
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"');
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
*/