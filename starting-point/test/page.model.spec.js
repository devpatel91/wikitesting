var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });
var chai = require('chai');
var spy = require('chai-spies');
var expect = chai.expect;
chai.use(spy);
var models = require('../models');
var Page = models.Page;
var page;

afterEach(function(done) {
    Page.sync({ force: true })
        .then(function() {
            done();
        })
        .catch(done);
})
beforeEach(function(done) {
    Page.create({
            title: 'foo',
            content: 'bar',
            tags: ['foo', 'bar']
        })
        .then(function(result) {
            page = result
            done();
        })
        .catch(done);
});



describe('Page model', function() {

    describe('Virtuals', function() {
        describe('route', function() {

            it('returns the url_name prepended by "/wiki/"', function() {

                expect(page.route.slice(0, 6)).to.be.equal("/wiki/");
            });
        });
        describe('renderedContent', function() {
            it('converts the markdown-formatted content into HTML', function() {
                expect(page.renderedContent).to.be.equal("<p>" + page.content + "</p>\n");
            });

        });
    });

    describe('Class methods', function() {
        describe('findByTag', function() {
            it('gets pages with the search tag', function(done) {
                Page.findByTag('foo')
                    .then(function(pages) {
                        expect(pages).to.have.lengthOf(1);
                        done();
                    })
                    .catch(done);

            });
            it('does not get pages without the search tag',function(done){
            	Page.findByTag('fo')
                    .then(function(pages) {
                        expect(pages).to.have.lengthOf(0);
                        done();
                    })
                    .catch(done);

            });
        });
    });

    describe('Instance methods', function() {
        describe('findSimilar', function() {
            xit('never gets itself');
            xit('gets other pages with any common tags');
            xit('does not get other pages without any common tags');
        });
    });

    describe('Validations', function() {
        xit('errors without title');
        xit('errors without content');
        xit('errors given an invalid status');
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating');
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
