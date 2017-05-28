/**
 * PostService
 * contains information about the current post (could be page, attachement etc)
 */
export default class PostService {
    constructor($window, $q, $log, Ajax) {
        'ngInject';        
        angular.extend(this, {'$window': $window, '$q': $q, '$log': $log, 'Ajax': Ajax});
        this.$wp = $window.wp_rest_object || {};
        this.post = this.$wp.postObject || {};
        this.route = Ajax.restRoute + "/posts";
        console.log("$wp", this.$wp);
    }

    /**
     * Only common functions are exposed by this service, for additional data on the post object not exposed, 
     * You can get the rest of the info from the post object via `the_post()`
     * 
     * Ignored fields on postObject include:
     * - comment_count
     * - comment_status
     * - filter
     * - guid
     * - menu_order
     * - ping_status
     * - post_content_filtered
     * - post_date_gmt
     * - post_mime_type
     * - post_modified_gmt
     * - post_parent
     * - post_password
     * - to_ping
     */
    the_ID() { return this.post.ID }
    the_post() { return this.post }
    the_excerpt() { return this.post.post_exerpt }
    the_title() { return this.post.post_title }
    the_author() { return this.post.post_author } // returns author ID
    the_content() { return this.post.post_content }
    the_status() { return this.post.post_status }
    the_publish_date() { return this.post.post_date }
    the_last_modified() { return this.post.post_modified }
    the_name() { return this.post.post_name }
    is_post() { this.post.post_type === 'post'}
    is_page() { this.post.post_type === 'page'}

    the_category() {}
    the_permalink() {}
    the_tags() {}
    is_sticky() {}
    is_single() {}
    has_excerpt() {}
    has_tag() {}
    has_thumbnail() {}
    has_post_format() {}

    // short-hands
    get_posts() { return this.Ajax.get(this.route) }
    get_post(postId = this.the_ID()) { return this.Ajax.get(this.route + "/" + postId) }
    get_post_categories(postId) { return this.Ajax.get(this.route + "/" + postId + "/categories")}
}
