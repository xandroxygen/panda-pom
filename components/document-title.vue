<script>
export default {
  name: "document-title",
  props: ["title"],
  mounted() {
    document.title = this.title;
  },
  watch: {
    title() {
      document.title = this.title;
    }
  },
  render() {}
};
</script>