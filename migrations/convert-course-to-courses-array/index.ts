import {at, defineMigration, setIfMissing, unset, append} from 'sanity/migrate'

export default defineMigration({
  title: "Convert course to courses array",
  documentTypes: ['enrollment'],
  filter: 'defined(course) && !defined(courses)',

  migrate: {
    document(enrollment) {
      return [
          at('courses', setIfMissing([])),
          at('courses', append(enrollment.course)),
          at('course', unset())
      ]
    },
  },
})
